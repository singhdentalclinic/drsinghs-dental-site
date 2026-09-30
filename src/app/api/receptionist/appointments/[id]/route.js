import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

import {
    requireStaff,
} from '@/lib/auth/requireStaff';

import {
    sendAppointmentConfirmed,
    sendAppointmentRejected,
    sendAppointmentRescheduled,
    sendAppointmentCancelled,
} from '@/lib/whatsapp/appointmentNotifications';

const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(
    supabaseUrl,
    serviceRoleKey,
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    }
);

/*
 * ---------------------------------------------------------
 * Convert time into PostgreSQL-compatible HH:MM:SS format.
 *
 * Examples:
 *
 * 10:00
 * -> 10:00:00
 *
 * 10:00 AM
 * -> 10:00:00
 *
 * 01:15 PM
 * -> 13:15:00
 * ---------------------------------------------------------
 */
function convertToDatabaseTime(time) {
    if (!time) {
        return null;
    }

    const cleanTime =
        String(time).trim();

    /*
     * HH:MM
     */
    if (
        /^\d{2}:\d{2}$/.test(
            cleanTime
        )
    ) {
        return `${cleanTime}:00`;
    }

    /*
     * HH:MM:SS
     */
    if (
        /^\d{2}:\d{2}:\d{2}$/.test(
            cleanTime
        )
    ) {
        return cleanTime;
    }

    /*
     * 12-hour format
     */
    const match =
        cleanTime.match(
            /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
        );

    if (!match) {
        return null;
    }

    let hour =
        Number(match[1]);

    const minute =
        match[2];

    const period =
        match[3].toUpperCase();

    if (
        period === 'AM' &&
        hour === 12
    ) {
        hour = 0;
    }

    if (
        period === 'PM' &&
        hour !== 12
    ) {
        hour += 12;
    }

    return `${String(hour).padStart(
        2,
        '0'
    )}:${minute}:00`;
}

/*
 * ---------------------------------------------------------
 * Convert database time into total minutes.
 *
 * Example:
 *
 * 10:15:00
 * -> 615
 * ---------------------------------------------------------
 */
function timeToMinutes(time) {
    if (!time) {
        return NaN;
    }

    const [
        hours,
        minutes,
    ] = String(time)
        .split(':')
        .map(Number);

    return (
        hours * 60 +
        minutes
    );
}

/*
 * ---------------------------------------------------------
 * Validate date
 * ---------------------------------------------------------
 */
function isValidDate(
    dateString
) {
    if (!dateString) {
        return false;
    }

    const date =
        new Date(
            `${dateString}T00:00:00`
        );

    return !Number.isNaN(
        date.getTime()
    );
}

/*
 * ---------------------------------------------------------
 * Validate selected appointment against clinic schedule.
 *
 * Clinic schedule is read directly from:
 *
 * public.clinic_schedule
 *
 * Slot duration = 15 minutes.
 * ---------------------------------------------------------
 */
async function validateClinicSchedule(
    appointmentDate,
    appointmentTime
) {
    if (
        !isValidDate(
            appointmentDate
        )
    ) {
        return {
            valid: false,
            message:
                'Invalid appointment date.',
        };
    }

    const selectedDate =
        new Date(
            `${appointmentDate}T00:00:00`
        );

    const dayOfWeek =
        selectedDate.getDay();

    const {
        data: schedule,
        error: scheduleError,
    } = await supabase
        .from(
            'clinic_schedule'
        )
        .select(`
      opening_time,
      closing_time,
      is_open
    `)
        .eq(
            'day_of_week',
            dayOfWeek
        )
        .single();

    if (
        scheduleError
    ) {
        console.error(
            'Schedule validation error:',
            scheduleError
        );

        return {
            valid: false,
            message:
                'Unable to verify clinic schedule.',
        };
    }

    if (
        !schedule ||
        !schedule.is_open
    ) {
        return {
            valid: false,
            message:
                'The clinic is closed on the selected date.',
        };
    }

    const appointmentMinutes =
        timeToMinutes(
            appointmentTime
        );

    const openingMinutes =
        timeToMinutes(
            schedule.opening_time
        );

    const closingMinutes =
        timeToMinutes(
            schedule.closing_time
        );

    if (
        Number.isNaN(
            appointmentMinutes
        ) ||
        Number.isNaN(
            openingMinutes
        ) ||
        Number.isNaN(
            closingMinutes
        )
    ) {
        return {
            valid: false,
            message:
                'Invalid clinic schedule configuration.',
        };
    }

    /*
     * Appointment duration is 15 minutes.
     */
    const appointmentEnd =
        appointmentMinutes + 15;

    if (
        appointmentMinutes <
        openingMinutes ||
        appointmentEnd >
        closingMinutes
    ) {
        return {
            valid: false,
            message:
                'The selected time is outside clinic hours.',
        };
    }

    /*
     * Only:
     *
     * :00
     * :15
     * :30
     * :45
     */
    if (
        appointmentMinutes %
        15 !==
        0
    ) {
        return {
            valid: false,
            message:
                'Please select a valid 15-minute appointment slot.',
        };
    }

    return {
        valid: true,
    };
}

/*
 * ---------------------------------------------------------
 * Helper so notification failures never break appointment
 * updates.
 * ---------------------------------------------------------
 */
async function safelySendNotification(
    notificationFunction,
    payload,
    label
) {
    try {
        const result =
            await notificationFunction(
                payload
            );

        if (
            result &&
            result.success === false
        ) {
            console.warn(
                `${label} WhatsApp notification was not sent:`,
                result
            );
        }

        return result;
    } catch (error) {
        console.error(
            `${label} WhatsApp notification error:`,
            error
        );

        return null;
    }
}

export async function PATCH(
    request,
    { params }
) {
    try {
        /*
         * -----------------------------------------------------
         * STAFF AUTHORIZATION
         * -----------------------------------------------------
         */
        const auth =
            await requireStaff();

        if (
            !auth.authorized
        ) {
            return NextResponse.json(
                {
                    message:
                        auth.message,
                },
                {
                    status:
                        auth.status,
                }
            );
        }

        /*
         * -----------------------------------------------------
         * SERVER CONFIGURATION
         * -----------------------------------------------------
         */
        if (
            !supabaseUrl ||
            !serviceRoleKey
        ) {
            console.error(
                'Supabase server configuration is missing.'
            );

            return NextResponse.json(
                {
                    message:
                        'Supabase server configuration is missing.',
                },
                {
                    status: 500,
                }
            );
        }

        /*
         * -----------------------------------------------------
         * APPOINTMENT ID
         * -----------------------------------------------------
         */
        const {
            id,
        } = await params;

        if (!id) {
            return NextResponse.json(
                {
                    message:
                        'Appointment ID is required.',
                },
                {
                    status: 400,
                }
            );
        }

        /*
         * -----------------------------------------------------
         * REQUEST BODY
         * -----------------------------------------------------
         */
        const body =
            await request.json();

        const {
            action,
            notes,
            appointmentDate,
            appointmentTime,
        } = body;

        if (!action) {
            return NextResponse.json(
                {
                    message:
                        'Appointment action is required.',
                },
                {
                    status: 400,
                }
            );
        }

        /*
         * -----------------------------------------------------
         * FETCH EXISTING APPOINTMENT + PATIENT
         * -----------------------------------------------------
         */
        const {
            data:
            existingAppointment,
            error:
            existingAppointmentError,
        } = await supabase
            .from(
                'appointments'
            )
            .select(`
        id,
        patient_id,
        appointment_date,
        appointment_time,
        duration_minutes,
        status,
        treatment_type,
        reason_for_visit,
        receptionist_notes,
        created_at,
        updated_at,
        patients (
          id,
          full_name,
          phone,
          date_of_birth
        )
      `)
            .eq(
                'id',
                id
            )
            .single();

        if (
            existingAppointmentError ||
            !existingAppointment
        ) {
            console.error(
                'Appointment lookup error:',
                existingAppointmentError
            );

            return NextResponse.json(
                {
                    message:
                        'Appointment could not be found.',
                },
                {
                    status: 404,
                }
            );
        }

        const patient =
            existingAppointment
                ?.patients;

        /*
         * =====================================================
         * CONFIRM
         * =====================================================
         */
        if (
            action ===
            'confirm'
        ) {
            if (
                existingAppointment.status !==
                'pending'
            ) {
                return NextResponse.json(
                    {
                        message:
                            'Only pending appointments can be confirmed.',
                    },
                    {
                        status: 400,
                    }
                );
            }

            const {
                data:
                updatedAppointment,
                error:
                updateError,
            } = await supabase
                .from(
                    'appointments'
                )
                .update({
                    status:
                        'confirmed',

                    receptionist_notes:
                        notes?.trim() ||
                        'Confirmed by receptionist',

                    updated_at:
                        new Date().toISOString(),
                })
                .eq(
                    'id',
                    id
                )
                .select()
                .single();

            if (
                updateError
            ) {
                console.error(
                    'Appointment confirmation error:',
                    updateError
                );

                return NextResponse.json(
                    {
                        message:
                            'Unable to confirm appointment.',

                        error:
                            updateError.message,
                    },
                    {
                        status: 500,
                    }
                );
            }

            /*
             * WhatsApp notification
             */
            await safelySendNotification(
                sendAppointmentConfirmed,
                {
                    phone:
                        patient?.phone,

                    patientName:
                        patient?.full_name,

                    appointmentDate:
                        updatedAppointment
                            .appointment_date,

                    appointmentTime:
                        updatedAppointment
                            .appointment_time,
                },
                'Confirmation'
            );

            return NextResponse.json({
                message:
                    'Appointment confirmed successfully.',

                appointment:
                    updatedAppointment,
            });
        }

        /*
         * =====================================================
         * REJECT
         * =====================================================
         */
        if (
            action ===
            'reject'
        ) {
            if (
                existingAppointment.status !==
                'pending'
            ) {
                return NextResponse.json(
                    {
                        message:
                            'Only pending appointments can be rejected.',
                    },
                    {
                        status: 400,
                    }
                );
            }

            const rejectionReason =
                notes?.trim();

            if (
                !rejectionReason
            ) {
                return NextResponse.json(
                    {
                        message:
                            'Please provide a reason for rejecting the appointment request.',
                    },
                    {
                        status: 400,
                    }
                );
            }

            const {
                data:
                updatedAppointment,
                error:
                updateError,
            } = await supabase
                .from(
                    'appointments'
                )
                .update({
                    status:
                        'rejected',

                    receptionist_notes:
                        rejectionReason,

                    updated_at:
                        new Date().toISOString(),
                })
                .eq(
                    'id',
                    id
                )
                .select()
                .single();

            if (
                updateError
            ) {
                console.error(
                    'Appointment rejection error:',
                    updateError
                );

                return NextResponse.json(
                    {
                        message:
                            'Unable to reject appointment.',

                        error:
                            updateError.message,
                    },
                    {
                        status: 500,
                    }
                );
            }

            await safelySendNotification(
                sendAppointmentRejected,
                {
                    phone:
                        patient?.phone,

                    patientName:
                        patient?.full_name,
                },
                'Rejection'
            );

            return NextResponse.json({
                message:
                    'Appointment request rejected successfully.',

                appointment:
                    updatedAppointment,
            });
        }

        /*
         * =====================================================
         * RESCHEDULE
         * =====================================================
         */
        if (
            action ===
            'reschedule'
        ) {
            if (
                ![
                    'pending',
                    'confirmed',
                ].includes(
                    existingAppointment.status
                )
            ) {
                return NextResponse.json(
                    {
                        message:
                            'Only pending or confirmed appointments can be rescheduled.',
                    },
                    {
                        status: 400,
                    }
                );
            }

            if (
                !appointmentDate ||
                !appointmentTime
            ) {
                return NextResponse.json(
                    {
                        message:
                            'New appointment date and time are required.',
                    },
                    {
                        status: 400,
                    }
                );
            }

            if (
                !isValidDate(
                    appointmentDate
                )
            ) {
                return NextResponse.json(
                    {
                        message:
                            'Invalid appointment date.',
                    },
                    {
                        status: 400,
                    }
                );
            }

            const databaseTime =
                convertToDatabaseTime(
                    appointmentTime
                );

            if (
                !databaseTime
            ) {
                return NextResponse.json(
                    {
                        message:
                            'Invalid appointment time.',
                    },
                    {
                        status: 400,
                    }
                );
            }

            /*
             * Prevent past dates.
             */
            const today =
                new Date();

            today.setHours(
                0,
                0,
                0,
                0
            );

            const newAppointmentDate =
                new Date(
                    `${appointmentDate}T00:00:00`
                );

            if (
                newAppointmentDate <
                today
            ) {
                return NextResponse.json(
                    {
                        message:
                            'Appointments cannot be rescheduled to a past date.',
                    },
                    {
                        status: 400,
                    }
                );
            }

            /*
             * Validate clinic hours.
             */
            const scheduleValidation =
                await validateClinicSchedule(
                    appointmentDate,
                    databaseTime
                );

            if (
                !scheduleValidation.valid
            ) {
                return NextResponse.json(
                    {
                        message:
                            scheduleValidation.message,
                    },
                    {
                        status: 400,
                    }
                );
            }

            /*
             * Check if another appointment occupies
             * the new slot.
             */
            const {
                data:
                conflictingAppointment,
                error:
                conflictError,
            } = await supabase
                .from(
                    'appointments'
                )
                .select(
                    'id'
                )
                .eq(
                    'appointment_date',
                    appointmentDate
                )
                .eq(
                    'appointment_time',
                    databaseTime
                )
                .in(
                    'status',
                    [
                        'pending',
                        'confirmed',
                    ]
                )
                .neq(
                    'id',
                    id
                )
                .maybeSingle();

            if (
                conflictError
            ) {
                console.error(
                    'Reschedule conflict check error:',
                    conflictError
                );

                return NextResponse.json(
                    {
                        message:
                            'Unable to verify the new appointment slot.',

                        error:
                            conflictError.message,
                    },
                    {
                        status: 500,
                    }
                );
            }

            if (
                conflictingAppointment
            ) {
                return NextResponse.json(
                    {
                        message:
                            'The selected appointment slot is already occupied.',
                    },
                    {
                        status: 409,
                    }
                );
            }

            /*
             * When rescheduled we return it to
             * pending so the new slot can be reviewed.
             */
            const {
                data:
                updatedAppointment,
                error:
                updateError,
            } = await supabase
                .from(
                    'appointments'
                )
                .update({
                    appointment_date:
                        appointmentDate,

                    appointment_time:
                        databaseTime,

                    duration_minutes:
                        15,

                    status:
                        'pending',

                    receptionist_notes:
                        notes?.trim() ||
                        'Rescheduled by receptionist',

                    updated_at:
                        new Date().toISOString(),
                })
                .eq(
                    'id',
                    id
                )
                .select()
                .single();

            if (
                updateError
            ) {
                console.error(
                    'Appointment reschedule error:',
                    updateError
                );

                /*
                 * PostgreSQL unique constraint.
                 */
                if (
                    updateError.code ===
                    '23505'
                ) {
                    return NextResponse.json(
                        {
                            message:
                                'The selected appointment slot was just taken. Please choose another time.',
                        },
                        {
                            status: 409,
                        }
                    );
                }

                return NextResponse.json(
                    {
                        message:
                            'Unable to reschedule appointment.',

                        error:
                            updateError.message,
                    },
                    {
                        status: 500,
                    }
                );
            }

            await safelySendNotification(
                sendAppointmentRescheduled,
                {
                    phone:
                        patient?.phone,

                    patientName:
                        patient?.full_name,

                    appointmentDate:
                        updatedAppointment
                            .appointment_date,

                    appointmentTime:
                        updatedAppointment
                            .appointment_time,
                },
                'Reschedule'
            );

            return NextResponse.json({
                message:
                    'Appointment rescheduled successfully.',

                appointment:
                    updatedAppointment,
            });
        }

        /*
         * =====================================================
         * CANCEL
         * =====================================================
         */
        if (
            action ===
            'cancel'
        ) {
            if (
                existingAppointment.status !==
                'confirmed'
            ) {
                return NextResponse.json(
                    {
                        message:
                            'Only confirmed appointments can be cancelled.',
                    },
                    {
                        status: 400,
                    }
                );
            }

            const cancellationReason =
                notes?.trim();

            if (
                !cancellationReason
            ) {
                return NextResponse.json(
                    {
                        message:
                            'Please provide a cancellation reason.',
                    },
                    {
                        status: 400,
                    }
                );
            }

            const {
                data:
                updatedAppointment,
                error:
                updateError,
            } = await supabase
                .from(
                    'appointments'
                )
                .update({
                    status:
                        'cancelled',

                    receptionist_notes:
                        cancellationReason,

                    updated_at:
                        new Date().toISOString(),
                })
                .eq(
                    'id',
                    id
                )
                .select()
                .single();

            if (
                updateError
            ) {
                console.error(
                    'Appointment cancellation error:',
                    updateError
                );

                return NextResponse.json(
                    {
                        message:
                            'Unable to cancel appointment.',

                        error:
                            updateError.message,
                    },
                    {
                        status: 500,
                    }
                );
            }

            await safelySendNotification(
                sendAppointmentCancelled,
                {
                    phone:
                        patient?.phone,

                    patientName:
                        patient?.full_name,

                    appointmentDate:
                        updatedAppointment
                            .appointment_date,

                    appointmentTime:
                        updatedAppointment
                            .appointment_time,
                },
                'Cancellation'
            );

            return NextResponse.json({
                message:
                    'Appointment cancelled successfully.',

                appointment:
                    updatedAppointment,
            });
        }

        /*
         * =====================================================
         * COMPLETE
         * =====================================================
         */
        if (
            action ===
            'complete'
        ) {
            if (
                existingAppointment.status !==
                'confirmed'
            ) {
                return NextResponse.json(
                    {
                        message:
                            'Only confirmed appointments can be marked as completed.',
                    },
                    {
                        status: 400,
                    }
                );
            }

            const {
                data:
                updatedAppointment,
                error:
                updateError,
            } = await supabase
                .from(
                    'appointments'
                )
                .update({
                    status:
                        'completed',

                    receptionist_notes:
                        notes?.trim() ||
                        'Appointment completed',

                    updated_at:
                        new Date().toISOString(),
                })
                .eq(
                    'id',
                    id
                )
                .select()
                .single();

            if (
                updateError
            ) {
                console.error(
                    'Appointment completion error:',
                    updateError
                );

                return NextResponse.json(
                    {
                        message:
                            'Unable to mark appointment as completed.',

                        error:
                            updateError.message,
                    },
                    {
                        status: 500,
                    }
                );
            }

            return NextResponse.json({
                message:
                    'Appointment marked as completed successfully.',

                appointment:
                    updatedAppointment,
            });
        }

        /*
         * =====================================================
         * NO SHOW
         * =====================================================
         */
        if (
            action ===
            'no_show'
        ) {
            if (
                existingAppointment.status !==
                'confirmed'
            ) {
                return NextResponse.json(
                    {
                        message:
                            'Only confirmed appointments can be marked as no-show.',
                    },
                    {
                        status: 400,
                    }
                );
            }

            const {
                data:
                updatedAppointment,
                error:
                updateError,
            } = await supabase
                .from(
                    'appointments'
                )
                .update({
                    status:
                        'no_show',

                    receptionist_notes:
                        notes?.trim() ||
                        'Patient did not attend',

                    updated_at:
                        new Date().toISOString(),
                })
                .eq(
                    'id',
                    id
                )
                .select()
                .single();

            if (
                updateError
            ) {
                console.error(
                    'No-show update error:',
                    updateError
                );

                return NextResponse.json(
                    {
                        message:
                            'Unable to mark appointment as no-show.',

                        error:
                            updateError.message,
                    },
                    {
                        status: 500,
                    }
                );
            }

            return NextResponse.json({
                message:
                    'Appointment marked as no-show successfully.',

                appointment:
                    updatedAppointment,
            });
        }

        /*
         * =====================================================
         * UNKNOWN ACTION
         * =====================================================
         */
        return NextResponse.json(
            {
                message:
                    'Invalid appointment action.',
            },
            {
                status: 400,
            }
        );
    } catch (error) {
        console.error(
            'Receptionist appointment update error:',
            error
        );

        return NextResponse.json(
            {
                message:
                    'Something went wrong while updating the appointment.',

                error:
                    error?.message ||
                    'Unknown server error.',
            },
            {
                status: 500,
            }
        );
    }
}
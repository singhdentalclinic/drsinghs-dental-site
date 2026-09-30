import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

/*
 * This client is server-only.
 *
 * Never expose SUPABASE_SERVICE_ROLE_KEY
 * using NEXT_PUBLIC_.
 */
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

function normalizePhone(phone) {
    if (!phone) {
        return '';
    }

    return String(phone).replace(/\D/g, '');
}

function convertToDatabaseTime(time) {
    if (!time) {
        return null;
    }

    const cleanTime = time.trim();

    /*
     * Already HH:MM
     */
    if (/^\d{2}:\d{2}$/.test(cleanTime)) {
        return `${cleanTime}:00`;
    }

    /*
     * Already HH:MM:SS
     */
    if (/^\d{2}:\d{2}:\d{2}$/.test(cleanTime)) {
        return cleanTime;
    }

    /*
     * Convert:
     *
     * 10:00 AM
     * 01:15 PM
     *
     * into PostgreSQL format.
     */
    const match = cleanTime.match(
        /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
    );

    if (!match) {
        return null;
    }

    let hour = Number(match[1]);

    const minute = match[2];

    const period = match[3].toUpperCase();

    if (period === 'AM' && hour === 12) {
        hour = 0;
    }

    if (period === 'PM' && hour !== 12) {
        hour += 12;
    }

    return `${String(hour).padStart(
        2,
        '0'
    )}:${minute}:00`;
}

function isValidDate(dateString) {
    if (!dateString) {
        return false;
    }

    const date = new Date(
        `${dateString}T00:00:00`
    );

    return !Number.isNaN(date.getTime());
}

function timeToMinutes(time) {
    const [hours, minutes] = time
        .split(':')
        .map(Number);

    return hours * 60 + minutes;
}

async function validateClinicSchedule(
    appointmentDate,
    appointmentTime
) {
    const selectedDate = new Date(
        `${appointmentDate}T00:00:00`
    );

    const dayOfWeek = selectedDate.getDay();

    const {
        data: schedule,
        error: scheduleError,
    } = await supabase
        .from('clinic_schedule')
        .select(
            `
        opening_time,
        closing_time,
        is_open
      `
        )
        .eq('day_of_week', dayOfWeek)
        .single();

    if (scheduleError) {
        console.error(
            'Clinic schedule validation error:',
            scheduleError
        );

        throw new Error(
            'Unable to verify clinic schedule.'
        );
    }

    if (!schedule || !schedule.is_open) {
        return {
            valid: false,
            message:
                'The clinic is closed on the selected date.',
        };
    }

    const appointmentMinutes =
        timeToMinutes(appointmentTime);

    const openingMinutes =
        timeToMinutes(schedule.opening_time);

    const closingMinutes =
        timeToMinutes(schedule.closing_time);

    const appointmentEndMinutes =
        appointmentMinutes + 15;

    /*
     * Appointment must be fully inside
     * clinic working hours.
     */
    if (
        appointmentMinutes < openingMinutes ||
        appointmentEndMinutes > closingMinutes
    ) {
        return {
            valid: false,
            message:
                'The selected appointment time is outside clinic hours.',
        };
    }

    /*
     * Only allow 15-minute boundaries.
     */
    if (appointmentMinutes % 15 !== 0) {
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

export async function POST(request) {
    try {
        /*
         * Validate server configuration first.
         */
        if (!supabaseUrl || !serviceRoleKey) {
            console.error(
                'Supabase server environment variables are missing.'
            );

            return NextResponse.json(
                {
                    message:
                        'Appointment service configuration is missing.',
                },
                {
                    status: 500,
                }
            );
        }

        const body = await request.json();

        const {
            firstName,
            lastName,
            phone,
            dateOfBirth,

            treatmentType,
            reasonForVisit,

            preferredDate,
            preferredTime,

            isNewPatient,
        } = body;

        /*
         * ------------------------------------
         * Required fields
         * ------------------------------------
         */
        if (
            !firstName?.trim() ||
            !lastName?.trim() ||
            !phone ||
            !dateOfBirth ||
            !treatmentType?.trim() ||
            !reasonForVisit?.trim() ||
            !preferredDate ||
            !preferredTime
        ) {
            return NextResponse.json(
                {
                    message:
                        'Please complete all required appointment fields.',
                },
                {
                    status: 400,
                }
            );
        }

        /*
         * ------------------------------------
         * Phone validation
         * ------------------------------------
         */
        const normalizedPhone =
            normalizePhone(phone);

        if (normalizedPhone.length !== 10) {
            return NextResponse.json(
                {
                    message:
                        'Please enter a valid 10-digit phone number.',
                },
                {
                    status: 400,
                }
            );
        }

        /*
         * ------------------------------------
         * DOB validation
         * ------------------------------------
         */
        if (!isValidDate(dateOfBirth)) {
            return NextResponse.json(
                {
                    message:
                        'Please enter a valid date of birth.',
                },
                {
                    status: 400,
                }
            );
        }

        /*
         * ------------------------------------
         * Appointment date validation
         * ------------------------------------
         */
        if (!isValidDate(preferredDate)) {
            return NextResponse.json(
                {
                    message:
                        'Please select a valid appointment date.',
                },
                {
                    status: 400,
                }
            );
        }

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const appointmentDateObject =
            new Date(
                `${preferredDate}T00:00:00`
            );

        if (appointmentDateObject < today) {
            return NextResponse.json(
                {
                    message:
                        'Appointments cannot be requested for a past date.',
                },
                {
                    status: 400,
                }
            );
        }

        /*
         * ------------------------------------
         * Convert appointment time
         * ------------------------------------
         */
        const databaseTime =
            convertToDatabaseTime(preferredTime);

        if (!databaseTime) {
            return NextResponse.json(
                {
                    message:
                        'The selected appointment time is invalid.',
                },
                {
                    status: 400,
                }
            );
        }

        /*
         * ------------------------------------
         * Validate clinic schedule
         * ------------------------------------
         */
        const scheduleCheck =
            await validateClinicSchedule(
                preferredDate,
                databaseTime
            );

        if (!scheduleCheck.valid) {
            return NextResponse.json(
                {
                    message:
                        scheduleCheck.message,
                },
                {
                    status: 400,
                }
            );
        }

        /*
         * ------------------------------------
         * Check slot availability again
         * ------------------------------------
         *
         * Even though AppointmentForm already
         * checks availability, backend must
         * verify again.
         */
        const {
            data: existingAppointment,
            error: slotCheckError,
        } = await supabase
            .from('appointments')
            .select('id')
            .eq(
                'appointment_date',
                preferredDate
            )
            .eq(
                'appointment_time',
                databaseTime
            )
            .in('status', [
                'pending',
                'confirmed',
            ])
            .maybeSingle();

        if (slotCheckError) {
            console.error(
                'Slot availability check error:',
                slotCheckError
            );

            return NextResponse.json(
                {
                    message:
                        'Unable to verify appointment availability.',
                },
                {
                    status: 500,
                }
            );
        }

        if (existingAppointment) {
            return NextResponse.json(
                {
                    message:
                        'This appointment slot is no longer available. Please choose another time.',
                },
                {
                    status: 409,
                }
            );
        }

        /*
        * ------------------------------------
        * Find patient by phone
        * ------------------------------------
        */
        const {
            data: existingPatient,
            error: patientLookupError,
        } = await supabase
            .from('patients')
            .select('*')
            .eq('phone', normalizedPhone)
            .maybeSingle();

        if (patientLookupError) {
            console.error(
                'Patient lookup error:',
                patientLookupError
            );

            return NextResponse.json(
                {
                    message:
                        'Unable to process patient information.',
                    error: patientLookupError.message,
                },
                {
                    status: 500,
                }
            );
        }

        let patient = existingPatient;

        /*
        * ------------------------------------
        * Create patient if not found
        * ------------------------------------
        */
        if (!patient) {
            const fullName =
                `${firstName.trim()} ${lastName.trim()}`.trim();

            const {
                data: createdPatient,
                error: patientCreateError,
            } = await supabase
                .from('patients')
                .insert({
                    full_name: fullName,
                    phone: normalizedPhone,
                    date_of_birth: dateOfBirth,
                })
                .select()
                .single();

            if (patientCreateError) {
                console.error(
                    'Patient creation error:',
                    patientCreateError
                );

                return NextResponse.json(
                    {
                        message:
                            'Unable to create patient record.',
                        error: patientCreateError.message,
                    },
                    {
                        status: 500,
                    }
                );
            }

            patient = createdPatient;
        }

        /*
         * ------------------------------------
         * Create appointment
         * ------------------------------------
         */
        const {
            data: appointment,
            error: appointmentCreateError,
        } = await supabase
            .from('appointments')
            .insert({
                patient_id:
                    patient.id,

                treatment_type:
                    treatmentType.trim(),

                reason_for_visit:
                    reasonForVisit.trim(),

                appointment_date:
                    preferredDate,

                appointment_time:
                    databaseTime,

                duration_minutes: 15,

                status: 'pending',
            })
            .select(
                `
          id,
          patient_id,
          treatment_type,
          reason_for_visit,
          appointment_date,
          appointment_time,
          duration_minutes,
          status,
          created_at
        `
            )
            .single();

        if (appointmentCreateError) {
            console.error(
                'Appointment creation error:',
                appointmentCreateError
            );

            /*
             * PostgreSQL unique constraint.
             *
             * This protects against two people
             * booking the same slot at nearly
             * the same moment.
             */
            if (
                appointmentCreateError.code ===
                '23505'
            ) {
                return NextResponse.json(
                    {
                        message:
                            'This appointment slot was just taken by another patient. Please choose another time.',
                    },
                    {
                        status: 409,
                    }
                );
            }

            return NextResponse.json(
                {
                    message:
                        'Unable to create appointment request.',
                    error:
                        appointmentCreateError.message,
                },
                {
                    status: 500,
                }
            );
        }

        /*
         * ------------------------------------
         * Success
         * ------------------------------------
         */
        return NextResponse.json(
            {
                message:
                    'Appointment request submitted successfully.',

                appointment: {
                    id:
                        appointment.id,

                    patientId:
                        appointment.patient_id,

                    treatmentType:
                        appointment.treatment_type,

                    reasonForVisit:
                        appointment.reason_for_visit,

                    appointmentDate:
                        appointment.appointment_date,

                    appointmentTime:
                        appointment.appointment_time,

                    durationMinutes:
                        appointment.duration_minutes,

                    status:
                        appointment.status,

                    createdAt:
                        appointment.created_at,
                },
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(
            'Unexpected appointment API error:',
            error
        );

        return NextResponse.json(
            {
                message:
                    'Something went wrong while processing your appointment request.',
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
    createClient as createAuthClient,
} from '@/lib/supabase/server';
import {
    requireStaff,
} from '@/lib/auth/requireStaff';
import {
    sendAppointmentRequestReceived,
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

export async function GET(request) {
    try {
        const auth =
            await requireStaff();

        if (!auth.authorized) {
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
         * ---------------------------------------
         * Authentication check
         * ---------------------------------------
         */
        const authClient =
            await createAuthClient();

        const {
            data: { user },
            error: authError,
        } = await authClient.auth.getUser();

        if (
            authError ||
            !user
        ) {
            return NextResponse.json(
                {
                    message: 'Unauthorized.',
                },
                {
                    status: 401,
                }
            );
        }

        /*
         * ---------------------------------------
         * Server configuration check
         * ---------------------------------------
         */
        if (
            !supabaseUrl ||
            !serviceRoleKey
        ) {
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

        const { searchParams } =
            new URL(request.url);

        const status =
            searchParams.get('status');

        const date =
            searchParams.get('date');

        /*
         * ---------------------------------------
         * Base query
         * ---------------------------------------
         */
        let query = supabase
            .from('appointments')
            .select(`
        id,
        patient_id,
        treatment_type,
        reason_for_visit,
        appointment_date,
        appointment_time,
        duration_minutes,
        status,
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
            .order(
                'appointment_date',
                {
                    ascending: true,
                }
            )
            .order(
                'appointment_time',
                {
                    ascending: true,
                }
            );

        /*
         * Optional status filter:
         *
         * ?status=pending
         * ?status=confirmed
         * ?status=completed
         * etc.
         */
        if (status) {
            query = query.eq(
                'status',
                status
            );
        }

        /*
         * Optional date filter:
         *
         * ?date=2026-09-10
         */
        if (date) {
            query = query.eq(
                'appointment_date',
                date
            );
        }

        const {
            data: appointments,
            error,
        } = await query;

        if (error) {
            console.error(
                'Receptionist appointment fetch error:',
                error
            );

            return NextResponse.json(
                {
                    message:
                        'Unable to load appointments.',
                    error:
                        error.message,
                },
                {
                    status: 500,
                }
            );
        }

        return NextResponse.json({
            appointments:
                appointments || [],
        });
    } catch (error) {
        console.error(
            'Receptionist API unexpected error:',
            error
        );
        /*
 * ------------------------------------
 * WhatsApp notification
 * ------------------------------------
 *
 * Notification failure must NOT
 * fail appointment creation.
 */
        try {
            const whatsappResult =
                await sendAppointmentRequestReceived({
                    phone:
                        patient.phone,

                    patientName:
                        patient.full_name,

                    appointmentDate:
                        appointment.appointment_date,

                    appointmentTime:
                        appointment.appointment_time,
                });

            if (
                !whatsappResult.success
            ) {
                console.warn(
                    'Appointment created, but WhatsApp notification was not sent:',
                    whatsappResult
                );
            }
        } catch (whatsappError) {
            console.error(
                'Appointment WhatsApp notification error:',
                whatsappError
            );
        }

        return NextResponse.json(
            {
                message:
                    'Something went wrong while loading appointments.',
                error:
                    error.message,
            },
            {
                status: 500,
            }
        );
    }
}
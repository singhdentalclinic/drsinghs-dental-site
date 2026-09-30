import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);

    return hours * 60 + minutes;
}

function minutesToTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export async function GET(request) {
    try {
        if (!supabaseUrl || !supabaseKey) {
            return NextResponse.json(
                {
                    message: 'Supabase environment variables are missing.',
                },
                {
                    status: 500,
                }
            );
        }

        const { searchParams } = new URL(request.url);

        const date = searchParams.get('date');

        if (!date) {
            return NextResponse.json(
                {
                    message: 'Date is required.',
                },
                {
                    status: 400,
                }
            );
        }

        const selectedDate = new Date(`${date}T00:00:00`);

        if (Number.isNaN(selectedDate.getTime())) {
            return NextResponse.json(
                {
                    message: 'Invalid date.',
                },
                {
                    status: 400,
                }
            );
        }

        const dayOfWeek = selectedDate.getDay();

        /*
         * Get clinic schedule for selected day.
         *
         * day_of_week:
         * 0 = Sunday
         * 1 = Monday
         * ...
         * 5 = Friday
         * 6 = Saturday
         */
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
                'Clinic schedule fetch error:',
                scheduleError
            );

            return NextResponse.json(
                {
                    message: 'Unable to load clinic schedule.',
                    error: scheduleError.message,
                },
                {
                    status: 500,
                }
            );
        }

        /*
         * Clinic closed
         */
        if (!schedule || !schedule.is_open) {
            return NextResponse.json({
                date,
                availableSlots: [],
            });
        }

        const openingMinutes = timeToMinutes(
            schedule.opening_time
        );

        const closingMinutes = timeToMinutes(
            schedule.closing_time
        );

        /*
         * Generate 15-minute slots.
         *
         * Normal day:
         * 10:00
         * 10:15
         * ...
         * 19:45
         *
         * Friday:
         * 10:00
         * ...
         * 11:45
         */
        const generatedSlots = [];

        for (
            let currentTime = openingMinutes;
            currentTime + 15 <= closingMinutes;
            currentTime += 15
        ) {
            generatedSlots.push(
                minutesToTime(currentTime)
            );
        }

        /*
         * Get already blocked appointments.
         *
         * Pending appointments also block the slot.
         */
        const {
            data: bookedAppointments,
            error: appointmentsError,
        } = await supabase
            .from('appointments')
            .select('appointment_time')
            .eq('appointment_date', date)
            .in('status', ['pending', 'confirmed']);

        if (appointmentsError) {
            console.error(
                'Appointment fetch error:',
                appointmentsError
            );

            return NextResponse.json(
                {
                    message:
                        'Unable to check existing appointments.',
                    error: appointmentsError.message,
                },
                {
                    status: 500,
                }
            );
        }

        /*
         * PostgreSQL might return:
         *
         * 10:00:00
         *
         * while generatedSlots contains:
         *
         * 10:00
         *
         * So convert everything to HH:MM.
         */
        const bookedTimes = new Set(
            (bookedAppointments || []).map(
                (appointment) =>
                    appointment.appointment_time.slice(0, 5)
            )
        );

        const availableSlots =
            generatedSlots.filter(
                (slot) => !bookedTimes.has(slot)
            );

        return NextResponse.json({
            date,
            availableSlots,
        });
    } catch (error) {
        console.error(
            'Availability API unexpected error:',
            error
        );

        return NextResponse.json(
            {
                message:
                    'Something went wrong while loading available slots.',
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
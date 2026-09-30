'use client';

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    useRouter,
} from 'next/navigation';

import Icon from '@/components/ui/AppIcon';

import {
    createClient,
} from '@/lib/supabase/client';

function formatTime(time) {
    if (!time) {
        return '';
    }

    const [
        hourString,
        minute,
    ] = time.split(':');

    let hour =
        Number(hourString);

    const period =
        hour >= 12
            ? 'PM'
            : 'AM';

    hour =
        hour % 12 || 12;

    return `${hour}:${minute} ${period}`;
}

function formatDate(
    dateString
) {
    if (!dateString) {
        return '';
    }

    const date =
        new Date(
            `${dateString}T00:00:00`
        );

    return new Intl.DateTimeFormat(
        'en-IN',
        {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }
    ).format(date);
}

function getTodayDate() {
    const now =
        new Date();

    const year =
        now.getFullYear();

    const month =
        String(
            now.getMonth() + 1
        ).padStart(
            2,
            '0'
        );

    const day =
        String(
            now.getDate()
        ).padStart(
            2,
            '0'
        );

    return `${year}-${month}-${day}`;
}

function StatusBadge({
    status,
}) {
    const styles = {
        pending:
            'bg-yellow-100 text-yellow-800 border-yellow-200',

        confirmed:
            'bg-green-100 text-green-800 border-green-200',

        rejected:
            'bg-red-100 text-red-800 border-red-200',

        cancelled:
            'bg-gray-100 text-gray-700 border-gray-200',

        completed:
            'bg-blue-100 text-blue-800 border-blue-200',

        no_show:
            'bg-orange-100 text-orange-800 border-orange-200',
    };

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold capitalize ${styles[status] ||
                'bg-gray-100 text-gray-700 border-gray-200'
                }`}
        >
            {status?.replace(
                '_',
                ' '
            )}
        </span>
    );
}

export default function ReceptionistDashboard() {
    const router =
        useRouter();

    const supabase =
        createClient();

    const [
        appointments,
        setAppointments,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState('');

    const [
        successMessage,
        setSuccessMessage,
    ] = useState('');

    const [
        filter,
        setFilter,
    ] = useState('all');

    const [
        updatingId,
        setUpdatingId,
    ] = useState(null);

    const [
        rescheduleAppointment,
        setRescheduleAppointment,
    ] = useState(null);

    const [
        rescheduleDate,
        setRescheduleDate,
    ] = useState('');

    const [
        rescheduleTime,
        setRescheduleTime,
    ] = useState('');

    const [
        availableSlots,
        setAvailableSlots,
    ] = useState([]);

    const [
        loadingSlots,
        setLoadingSlots,
    ] = useState(false);

    const [
        receptionistNotes,
        setReceptionistNotes,
    ] = useState('');

    const fetchAppointments =
        useCallback(
            async () => {
                setLoading(true);

                setError('');

                try {
                    const response =
                        await fetch(
                            '/api/receptionist/appointments',
                            {
                                cache:
                                    'no-store',
                            }
                        );

                    const result =
                        await response.json();

                    if (
                        response.status ===
                        401
                    ) {
                        router.push(
                            '/receptionist/login'
                        );

                        router.refresh();

                        return;
                    }

                    if (
                        !response.ok
                    ) {
                        throw new Error(
                            result?.message ||
                            'Unable to load appointments.'
                        );
                    }

                    setAppointments(
                        result?.appointments ||
                        []
                    );
                } catch (
                err
                ) {
                    console.error(
                        'Dashboard appointment fetch error:',
                        err
                    );

                    setError(
                        err.message ||
                        'Unable to load appointments.'
                    );
                } finally {
                    setLoading(false);
                }
            },
            [
                router,
            ]
        );

    useEffect(() => {
        fetchAppointments();
    }, [
        fetchAppointments,
    ]);

    const today =
        getTodayDate();

    const summary =
        useMemo(() => {
            return {
                total:
                    appointments.length,

                pending:
                    appointments.filter(
                        (
                            appointment
                        ) =>
                            appointment.status ===
                            'pending'
                    ).length,

                confirmed:
                    appointments.filter(
                        (
                            appointment
                        ) =>
                            appointment.status ===
                            'confirmed'
                    ).length,

                today:
                    appointments.filter(
                        (
                            appointment
                        ) =>
                            appointment.appointment_date ===
                            today
                    ).length,
            };
        }, [
            appointments,
            today,
        ]);

    const filteredAppointments =
        useMemo(() => {
            if (
                filter ===
                'all'
            ) {
                return appointments;
            }

            if (
                filter ===
                'today'
            ) {
                return appointments.filter(
                    (
                        appointment
                    ) =>
                        appointment.appointment_date ===
                        today
                );
            }

            return appointments.filter(
                (
                    appointment
                ) =>
                    appointment.status ===
                    filter
            );
        }, [
            appointments,
            filter,
            today,
        ]);

    const handleLogout =
        async () => {
            await supabase.auth.signOut();

            router.push(
                '/receptionist/login'
            );

            router.refresh();
        };

    const handleConfirm =
        async (
            appointment
        ) => {
            const confirmed =
                window.confirm(
                    `Confirm appointment for ${appointment
                        ?.patients
                        ?.full_name ||
                    'this patient'
                    }?`
                );

            if (
                !confirmed
            ) {
                return;
            }

            setUpdatingId(
                appointment.id
            );

            setError('');

            setSuccessMessage(
                ''
            );

            try {
                const response =
                    await fetch(
                        `/api/receptionist/appointments/${appointment.id}`,
                        {
                            method:
                                'PATCH',

                            headers: {
                                'Content-Type':
                                    'application/json',
                            },

                            body:
                                JSON.stringify(
                                    {
                                        action:
                                            'confirm',

                                        notes:
                                            'Confirmed by receptionist',
                                    }
                                ),
                        }
                    );

                const result =
                    await response.json();

                if (
                    response.status ===
                    401
                ) {
                    router.push(
                        '/receptionist/login'
                    );

                    return;
                }

                if (
                    !response.ok
                ) {
                    throw new Error(
                        result?.message ||
                        'Unable to confirm appointment.'
                    );
                }

                setSuccessMessage(
                    'Appointment confirmed successfully.'
                );

                await fetchAppointments();
            } catch (
            err
            ) {
                console.error(
                    'Confirmation error:',
                    err
                );

                setError(
                    err.message
                );
            } finally {
                setUpdatingId(
                    null
                );
            }
        };

    const handleReject =
        async (
            appointment
        ) => {
            const reason =
                window.prompt(
                    'Reason for rejecting this appointment request:'
                );

            if (
                reason ===
                null
            ) {
                return;
            }

            if (
                !reason.trim()
            ) {
                setError(
                    'Please enter a rejection reason.'
                );

                return;
            }

            setUpdatingId(
                appointment.id
            );

            setError('');

            setSuccessMessage(
                ''
            );

            try {
                const response =
                    await fetch(
                        `/api/receptionist/appointments/${appointment.id}`,
                        {
                            method:
                                'PATCH',

                            headers: {
                                'Content-Type':
                                    'application/json',
                            },

                            body:
                                JSON.stringify(
                                    {
                                        action:
                                            'reject',

                                        notes:
                                            reason.trim(),
                                    }
                                ),
                        }
                    );

                const result =
                    await response.json();

                if (
                    response.status ===
                    401
                ) {
                    router.push(
                        '/receptionist/login'
                    );

                    return;
                }

                if (
                    !response.ok
                ) {
                    throw new Error(
                        result?.message ||
                        'Unable to reject appointment.'
                    );
                }

                setSuccessMessage(
                    'Appointment request rejected.'
                );

                await fetchAppointments();
            } catch (
            err
            ) {
                console.error(
                    'Rejection error:',
                    err
                );

                setError(
                    err.message
                );
            } finally {
                setUpdatingId(
                    null
                );
            }
        };

    const handleAppointmentAction =
        async (
            appointment,
            action,
            notes = ''
        ) => {
            setUpdatingId(
                appointment.id
            );

            setError('');

            setSuccessMessage(
                ''
            );

            try {
                const response =
                    await fetch(
                        `/api/receptionist/appointments/${appointment.id}`,
                        {
                            method:
                                'PATCH',

                            headers: {
                                'Content-Type':
                                    'application/json',
                            },

                            body:
                                JSON.stringify(
                                    {
                                        action,
                                        notes,
                                    }
                                ),
                        }
                    );

                const result =
                    await response.json();

                if (
                    response.status ===
                    401
                ) {
                    router.push(
                        '/receptionist/login'
                    );

                    return;
                }

                if (
                    !response.ok
                ) {
                    throw new Error(
                        result?.message ||
                        'Unable to update appointment.'
                    );
                }

                setSuccessMessage(
                    result?.message ||
                    'Appointment updated successfully.'
                );

                await fetchAppointments();
            } catch (
            err
            ) {
                console.error(
                    'Appointment action error:',
                    err
                );

                setError(
                    err.message ||
                    'Unable to update appointment.'
                );
            } finally {
                setUpdatingId(
                    null
                );
            }
        };

    const handleCancel =
        async (
            appointment
        ) => {
            const reason =
                window.prompt(
                    'Reason for cancelling this appointment:'
                );

            if (
                reason ===
                null
            ) {
                return;
            }

            if (
                !reason.trim()
            ) {
                setError(
                    'Please enter a cancellation reason.'
                );

                return;
            }

            const confirmed =
                window.confirm(
                    `Cancel appointment for ${appointment
                        ?.patients
                        ?.full_name ||
                    'this patient'
                    }?`
                );

            if (
                !confirmed
            ) {
                return;
            }

            await handleAppointmentAction(
                appointment,
                'cancel',
                reason.trim()
            );
        };

    const handleComplete =
        async (
            appointment
        ) => {
            const confirmed =
                window.confirm(
                    `Mark ${appointment
                        ?.patients
                        ?.full_name ||
                    'this patient'
                    }'s appointment as completed?`
                );

            if (
                !confirmed
            ) {
                return;
            }

            await handleAppointmentAction(
                appointment,
                'complete',
                'Appointment completed'
            );
        };

    const handleNoShow =
        async (
            appointment
        ) => {
            const confirmed =
                window.confirm(
                    `Mark ${appointment
                        ?.patients
                        ?.full_name ||
                    'this patient'
                    } as a no-show?`
                );

            if (
                !confirmed
            ) {
                return;
            }

            await handleAppointmentAction(
                appointment,
                'no_show',
                'Patient did not attend'
            );
        };

    const openRescheduleModal =
        (
            appointment
        ) => {
            setRescheduleAppointment(
                appointment
            );

            setRescheduleDate(
                appointment.appointment_date
            );

            setRescheduleTime(
                ''
            );

            setAvailableSlots(
                []
            );

            setReceptionistNotes(
                ''
            );

            setError('');
        };

    useEffect(() => {
        if (
            !rescheduleAppointment ||
            !rescheduleDate
        ) {
            return;
        }

        const loadAvailableSlots =
            async () => {
                setLoadingSlots(
                    true
                );

                try {
                    const response =
                        await fetch(
                            `/api/appointments/availability?date=${encodeURIComponent(
                                rescheduleDate
                            )}`
                        );

                    const result =
                        await response.json();

                    if (
                        !response.ok
                    ) {
                        throw new Error(
                            result?.message ||
                            'Unable to load available slots.'
                        );
                    }

                    setAvailableSlots(
                        result?.availableSlots ||
                        []
                    );
                } catch (
                err
                ) {
                    console.error(
                        'Reschedule slots error:',
                        err
                    );

                    setError(
                        err.message
                    );

                    setAvailableSlots(
                        []
                    );
                } finally {
                    setLoadingSlots(
                        false
                    );
                }
            };

        loadAvailableSlots();
    }, [
        rescheduleDate,
        rescheduleAppointment,
    ]);

    const handleReschedule =
        async () => {
            if (
                !rescheduleAppointment
            ) {
                return;
            }

            if (
                !rescheduleDate ||
                !rescheduleTime
            ) {
                setError(
                    'Please select a new date and time.'
                );

                return;
            }

            setUpdatingId(
                rescheduleAppointment.id
            );

            setError('');

            setSuccessMessage(
                ''
            );

            try {
                const response =
                    await fetch(
                        `/api/receptionist/appointments/${rescheduleAppointment.id}`,
                        {
                            method:
                                'PATCH',

                            headers: {
                                'Content-Type':
                                    'application/json',
                            },

                            body:
                                JSON.stringify(
                                    {
                                        action:
                                            'reschedule',

                                        appointmentDate:
                                            rescheduleDate,

                                        appointmentTime:
                                            rescheduleTime,

                                        notes:
                                            receptionistNotes.trim() ||
                                            'Rescheduled by receptionist',
                                    }
                                ),
                        }
                    );

                const result =
                    await response.json();

                if (
                    response.status ===
                    401
                ) {
                    router.push(
                        '/receptionist/login'
                    );

                    return;
                }

                if (
                    !response.ok
                ) {
                    throw new Error(
                        result?.message ||
                        'Unable to reschedule appointment.'
                    );
                }

                setSuccessMessage(
                    'Appointment rescheduled successfully.'
                );

                setRescheduleAppointment(
                    null
                );

                setRescheduleDate(
                    ''
                );

                setRescheduleTime(
                    ''
                );

                setReceptionistNotes(
                    ''
                );

                await fetchAppointments();
            } catch (
            err
            ) {
                console.error(
                    'Reschedule error:',
                    err
                );

                setError(
                    err.message
                );
            } finally {
                setUpdatingId(
                    null
                );
            }
        };

    if (
        loading
    ) {
        return (
            <div className="min-h-screen bg-background pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex items-center justify-center min-h-[400px]">

                        <div className="text-center">

                            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />

                            <p className="text-text-secondary">
                                Loading appointments...
                            </p>

                        </div>

                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-background pt-24 md:pt-28 pb-12">

                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

                    <div className="mb-8">

                        <p className="text-sm font-medium text-primary mb-2">
                            Singh Dental Clinic
                        </p>

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

                            <div>

                                <h1 className="text-3xl md:text-4xl font-semibold text-text-primary">
                                    Receptionist Dashboard
                                </h1>

                                <p className="text-text-secondary mt-2">
                                    Manage appointment requests and clinic bookings.
                                </p>

                            </div>

                            <div className="flex flex-wrap gap-3">

                                <button
                                    type="button"
                                    onClick={
                                        fetchAppointments
                                    }
                                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border rounded-md font-medium text-text-primary hover:bg-muted transition-colors"
                                >
                                    <Icon
                                        name="ArrowPathIcon"
                                        size={19}
                                    />

                                    Refresh
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        handleLogout
                                    }
                                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border rounded-md font-medium text-text-primary hover:bg-muted transition-colors"
                                >
                                    <Icon
                                        name="ArrowRightOnRectangleIcon"
                                        size={19}
                                    />

                                    Logout
                                </button>

                            </div>

                        </div>

                    </div>

                    {successMessage && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 flex items-start gap-3">

                            <Icon
                                name="CheckCircleIcon"
                                size={22}
                                variant="solid"
                                className="flex-shrink-0"
                            />

                            <p className="text-sm font-medium">
                                {successMessage}
                            </p>

                        </div>
                    )}

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start gap-3">

                            <Icon
                                name="ExclamationCircleIcon"
                                size={22}
                                variant="solid"
                                className="flex-shrink-0"
                            />

                            <p className="text-sm font-medium">
                                {error}
                            </p>

                        </div>
                    )}

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">

                        <SummaryCard
                            label="Total"
                            value={
                                summary.total
                            }
                            icon="CalendarDaysIcon"
                        />

                        <SummaryCard
                            label="Pending"
                            value={
                                summary.pending
                            }
                            icon="ClockIcon"
                        />

                        <SummaryCard
                            label="Confirmed"
                            value={
                                summary.confirmed
                            }
                            icon="CheckCircleIcon"
                        />

                        <SummaryCard
                            label="Today"
                            value={
                                summary.today
                            }
                            icon="CalendarIcon"
                        />

                    </div>

                    <div className="bg-white shadow-elevation-sm rounded-lg p-3 mb-6 overflow-x-auto">

                        <div className="flex gap-2 min-w-max">

                            <FilterButton
                                active={
                                    filter ===
                                    'all'
                                }
                                onClick={() =>
                                    setFilter(
                                        'all'
                                    )
                                }
                            >
                                All
                            </FilterButton>

                            <FilterButton
                                active={
                                    filter ===
                                    'pending'
                                }
                                onClick={() =>
                                    setFilter(
                                        'pending'
                                    )
                                }
                            >
                                Pending
                            </FilterButton>

                            <FilterButton
                                active={
                                    filter ===
                                    'confirmed'
                                }
                                onClick={() =>
                                    setFilter(
                                        'confirmed'
                                    )
                                }
                            >
                                Confirmed
                            </FilterButton>

                            <FilterButton
                                active={
                                    filter ===
                                    'completed'
                                }
                                onClick={() =>
                                    setFilter(
                                        'completed'
                                    )
                                }
                            >
                                Completed
                            </FilterButton>

                            <FilterButton
                                active={
                                    filter ===
                                    'rejected'
                                }
                                onClick={() =>
                                    setFilter(
                                        'rejected'
                                    )
                                }
                            >
                                Rejected
                            </FilterButton>

                            <FilterButton
                                active={
                                    filter ===
                                    'cancelled'
                                }
                                onClick={() =>
                                    setFilter(
                                        'cancelled'
                                    )
                                }
                            >
                                Cancelled
                            </FilterButton>

                            <FilterButton
                                active={
                                    filter ===
                                    'no_show'
                                }
                                onClick={() =>
                                    setFilter(
                                        'no_show'
                                    )
                                }
                            >
                                No Show
                            </FilterButton>

                            <FilterButton
                                active={
                                    filter ===
                                    'today'
                                }
                                onClick={() =>
                                    setFilter(
                                        'today'
                                    )
                                }
                            >
                                Today
                            </FilterButton>

                        </div>

                    </div>

                    <div className="space-y-5">

                        {filteredAppointments.length ===
                            0 ? (

                            <div className="bg-white rounded-lg shadow-elevation-sm p-12 text-center">

                                <Icon
                                    name="CalendarDaysIcon"
                                    size={44}
                                    className="text-text-secondary mx-auto mb-4"
                                />

                                <h3 className="text-lg font-semibold text-text-primary mb-2">
                                    No appointments found
                                </h3>

                                <p className="text-text-secondary">
                                    There are no appointments matching this filter.
                                </p>

                            </div>

                        ) : (

                            filteredAppointments.map(
                                (
                                    appointment
                                ) => (

                                    <AppointmentCard
                                        key={
                                            appointment.id
                                        }

                                        appointment={
                                            appointment
                                        }

                                        updating={
                                            updatingId ===
                                            appointment.id
                                        }

                                        onConfirm={() =>
                                            handleConfirm(
                                                appointment
                                            )
                                        }

                                        onReject={() =>
                                            handleReject(
                                                appointment
                                            )
                                        }

                                        onReschedule={() =>
                                            openRescheduleModal(
                                                appointment
                                            )
                                        }

                                        onCancel={() =>
                                            handleCancel(
                                                appointment
                                            )
                                        }

                                        onComplete={() =>
                                            handleComplete(
                                                appointment
                                            )
                                        }

                                        onNoShow={() =>
                                            handleNoShow(
                                                appointment
                                            )
                                        }
                                    />

                                )
                            )

                        )}

                    </div>

                </div>

            </div>

            {rescheduleAppointment && (

                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

                    <div className="bg-white rounded-xl shadow-elevation-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">

                        <div className="p-6 border-b border-border flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-semibold text-text-primary">
                                    Reschedule Appointment
                                </h2>

                                <p className="text-sm text-text-secondary mt-1">
                                    {
                                        rescheduleAppointment
                                            ?.patients
                                            ?.full_name
                                    }
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setRescheduleAppointment(
                                        null
                                    )
                                }
                                className="p-2 rounded-md hover:bg-muted"
                            >
                                <Icon
                                    name="XMarkIcon"
                                    size={22}
                                />
                            </button>

                        </div>

                        <div className="p-6 space-y-5">

                            <div>

                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    New Date
                                </label>

                                <input
                                    type="date"
                                    value={
                                        rescheduleDate
                                    }
                                    min={
                                        today
                                    }
                                    onChange={(
                                        event
                                    ) => {
                                        setRescheduleDate(
                                            event
                                                .target
                                                .value
                                        );

                                        setRescheduleTime(
                                            ''
                                        );
                                    }}
                                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    New Time
                                </label>

                                <select
                                    value={
                                        rescheduleTime
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setRescheduleTime(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    disabled={
                                        loadingSlots
                                    }
                                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                                >

                                    <option value="">
                                        {loadingSlots
                                            ? 'Loading available slots...'
                                            : 'Select available time'}
                                    </option>

                                    {availableSlots.map(
                                        (
                                            slot
                                        ) => (

                                            <option
                                                key={
                                                    slot
                                                }
                                                value={
                                                    slot
                                                }
                                            >
                                                {formatTime(
                                                    slot
                                                )}
                                            </option>

                                        )
                                    )}

                                </select>

                                {!loadingSlots &&
                                    rescheduleDate &&
                                    availableSlots.length ===
                                    0 && (

                                        <p className="text-sm text-red-600 mt-2">
                                            No available slots for this date.
                                        </p>

                                    )}

                            </div>

                            <div>

                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Receptionist Notes
                                </label>

                                <textarea
                                    value={
                                        receptionistNotes
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setReceptionistNotes(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    rows={
                                        3
                                    }
                                    placeholder="Optional note..."
                                    className="w-full px-4 py-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                                />

                            </div>

                        </div>

                        <div className="p-6 border-t border-border flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    setRescheduleAppointment(
                                        null
                                    )
                                }
                                className="px-5 py-2.5 border border-border rounded-md font-medium hover:bg-muted"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={
                                    handleReschedule
                                }
                                disabled={
                                    updatingId ===
                                    rescheduleAppointment.id ||
                                    !rescheduleDate ||
                                    !rescheduleTime
                                }
                                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {updatingId ===
                                    rescheduleAppointment.id
                                    ? 'Updating...'
                                    : 'Reschedule Appointment'}
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}

function SummaryCard({
    label,
    value,
    icon,
}) {
    return (
        <div className="bg-white rounded-lg shadow-elevation-sm p-5 md:p-6">

            <div className="flex items-center justify-between mb-4">

                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">

                    <Icon
                        name={
                            icon
                        }
                        size={
                            22
                        }
                        className="text-primary"
                    />

                </div>

            </div>

            <p className="text-2xl md:text-3xl font-semibold text-text-primary">
                {value}
            </p>

            <p className="text-sm text-text-secondary mt-1">
                {label}
            </p>

        </div>
    );
}

function FilterButton({
    active,
    onClick,
    children,
}) {
    return (
        <button
            type="button"
            onClick={
                onClick
            }
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:bg-muted'
                }`}
        >
            {children}
        </button>
    );
}

function AppointmentCard({
    appointment,
    updating,
    onConfirm,
    onReject,
    onReschedule,
    onCancel,
    onComplete,
    onNoShow,
}) {
    const patient =
        appointment?.patients;

    return (
        <div className="bg-white rounded-lg shadow-elevation-sm p-5 md:p-6">

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3 mb-4">

                        <h3 className="text-xl font-semibold text-text-primary">
                            {patient
                                ?.full_name ||
                                'Unknown Patient'}
                        </h3>

                        <StatusBadge
                            status={
                                appointment.status
                            }
                        />

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                        <InfoItem
                            icon="PhoneIcon"
                            label="Phone"
                            value={
                                patient
                                    ?.phone ||
                                'Not provided'
                            }
                        />

                        <InfoItem
                            icon="CalendarIcon"
                            label="Date"
                            value={formatDate(
                                appointment.appointment_date
                            )}
                        />

                        <InfoItem
                            icon="ClockIcon"
                            label="Time"
                            value={formatTime(
                                appointment.appointment_time
                            )}
                        />

                        <InfoItem
                            icon="HeartIcon"
                            label="Treatment"
                            value={
                                appointment.treatment_type
                            }
                        />

                    </div>

                    {appointment.reason_for_visit && (

                        <div className="mt-5 bg-muted/60 rounded-md p-4">

                            <p className="text-xs uppercase tracking-wide font-semibold text-text-secondary mb-1">
                                Reason for Visit
                            </p>

                            <p className="text-sm text-text-primary">
                                {
                                    appointment.reason_for_visit
                                }
                            </p>

                        </div>

                    )}

                    {appointment.receptionist_notes && (

                        <div className="mt-3 border border-border rounded-md p-4">

                            <p className="text-xs uppercase tracking-wide font-semibold text-text-secondary mb-1">
                                Receptionist Notes
                            </p>

                            <p className="text-sm text-text-primary">
                                {
                                    appointment.receptionist_notes
                                }
                            </p>

                        </div>

                    )}

                </div>

                <div className="flex flex-wrap lg:flex-col gap-3 lg:w-44">

                    {appointment.status ===
                        'pending' && (

                            <>

                                <button
                                    type="button"
                                    disabled={
                                        updating
                                    }
                                    onClick={
                                        onConfirm
                                    }
                                    className="flex-1 lg:w-full px-4 py-2.5 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 disabled:opacity-50"
                                >
                                    {updating
                                        ? 'Updating...'
                                        : 'Confirm'}
                                </button>

                                <button
                                    type="button"
                                    disabled={
                                        updating
                                    }
                                    onClick={
                                        onReschedule
                                    }
                                    className="flex-1 lg:w-full px-4 py-2.5 border border-primary text-primary rounded-md font-semibold hover:bg-primary/5 disabled:opacity-50"
                                >
                                    Reschedule
                                </button>

                                <button
                                    type="button"
                                    disabled={
                                        updating
                                    }
                                    onClick={
                                        onReject
                                    }
                                    className="flex-1 lg:w-full px-4 py-2.5 border border-red-300 text-red-600 rounded-md font-semibold hover:bg-red-50 disabled:opacity-50"
                                >
                                    Reject
                                </button>

                            </>

                        )}

                    {appointment.status ===
                        'confirmed' && (

                            <>

                                <button
                                    type="button"
                                    disabled={
                                        updating
                                    }
                                    onClick={
                                        onReschedule
                                    }
                                    className="w-full px-4 py-2.5 border border-primary text-primary rounded-md font-semibold hover:bg-primary/5 disabled:opacity-50"
                                >
                                    Reschedule
                                </button>

                                <button
                                    type="button"
                                    disabled={
                                        updating
                                    }
                                    onClick={
                                        onComplete
                                    }
                                    className="w-full px-4 py-2.5 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 disabled:opacity-50"
                                >
                                    Complete
                                </button>

                                <button
                                    type="button"
                                    disabled={
                                        updating
                                    }
                                    onClick={
                                        onNoShow
                                    }
                                    className="w-full px-4 py-2.5 border border-orange-300 text-orange-700 rounded-md font-semibold hover:bg-orange-50 disabled:opacity-50"
                                >
                                    No Show
                                </button>

                                <button
                                    type="button"
                                    disabled={
                                        updating
                                    }
                                    onClick={
                                        onCancel
                                    }
                                    className="w-full px-4 py-2.5 border border-red-300 text-red-600 rounded-md font-semibold hover:bg-red-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                            </>

                        )}

                </div>

            </div>

        </div>
    );
}

function InfoItem({
    icon,
    label,
    value,
}) {
    return (
        <div className="flex items-start gap-3">

            <div className="w-9 h-9 flex items-center justify-center bg-muted rounded-md flex-shrink-0">

                <Icon
                    name={
                        icon
                    }
                    size={
                        18
                    }
                    className="text-text-secondary"
                />

            </div>

            <div className="min-w-0">

                <p className="text-xs text-text-secondary mb-1">
                    {label}
                </p>

                <p className="text-sm font-medium text-text-primary break-words">
                    {value}
                </p>

            </div>

        </div>
    );
}
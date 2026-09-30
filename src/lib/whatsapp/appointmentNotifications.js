import {
    sendWhatsAppTemplate,
} from './sendWhatsApp';

function formatAppointmentDate(
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

function formatAppointmentTime(
    time
) {
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

/*
 * ---------------------------------------
 * REQUEST RECEIVED
 * ---------------------------------------
 */
export async function sendAppointmentRequestReceived({
    phone,
    patientName,
    appointmentDate,
    appointmentTime,
}) {
    return sendWhatsAppTemplate({
        phone,

        templateName:
            'appointment_request_received',

        parameters: [
            patientName,
            formatAppointmentDate(
                appointmentDate
            ),
            formatAppointmentTime(
                appointmentTime
            ),
        ],
    });
}

/*
 * ---------------------------------------
 * CONFIRMED
 * ---------------------------------------
 */
export async function sendAppointmentConfirmed({
    phone,
    patientName,
    appointmentDate,
    appointmentTime,
}) {
    return sendWhatsAppTemplate({
        phone,

        templateName:
            'appointment_confirmed',

        parameters: [
            patientName,
            formatAppointmentDate(
                appointmentDate
            ),
            formatAppointmentTime(
                appointmentTime
            ),
        ],
    });
}

/*
 * ---------------------------------------
 * RESCHEDULED
 * ---------------------------------------
 */
export async function sendAppointmentRescheduled({
    phone,
    patientName,
    appointmentDate,
    appointmentTime,
}) {
    return sendWhatsAppTemplate({
        phone,

        templateName:
            'appointment_rescheduled',

        parameters: [
            patientName,
            formatAppointmentDate(
                appointmentDate
            ),
            formatAppointmentTime(
                appointmentTime
            ),
        ],
    });
}

/*
 * ---------------------------------------
 * REJECTED
 * ---------------------------------------
 */
export async function sendAppointmentRejected({
    phone,
    patientName,
}) {
    return sendWhatsAppTemplate({
        phone,

        templateName:
            'appointment_request_rejected',

        parameters: [
            patientName,
        ],
    });
}

/*
 * ---------------------------------------
 * CANCELLED
 * ---------------------------------------
 */
export async function sendAppointmentCancelled({
    phone,
    patientName,
    appointmentDate,
    appointmentTime,
}) {
    return sendWhatsAppTemplate({
        phone,

        templateName:
            'appointment_cancelled',

        parameters: [
            patientName,
            formatAppointmentDate(
                appointmentDate
            ),
            formatAppointmentTime(
                appointmentTime
            ),
        ],
    });
}
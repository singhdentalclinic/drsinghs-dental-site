const accessToken =
    process.env.WHATSAPP_ACCESS_TOKEN;

const phoneNumberId =
    process.env.WHATSAPP_PHONE_NUMBER_ID;

const apiVersion =
    process.env.WHATSAPP_API_VERSION;

const defaultCountryCode =
    process.env.WHATSAPP_DEFAULT_COUNTRY_CODE ||
    '91';

export function isWhatsAppConfigured() {
    return Boolean(
        accessToken &&
        phoneNumberId &&
        apiVersion
    );
}

/**
 * Convert common phone formats into
 * WhatsApp-compatible international format.
 *
 * Examples:
 *
 * 9876543210
 * -> 919876543210
 *
 * +91 98765 43210
 * -> 919876543210
 *
 * 919876543210
 * -> 919876543210
 */
export function normalizeWhatsAppPhone(
    phone
) {
    if (!phone) {
        return null;
    }

    let digits =
        String(phone).replace(
            /\D/g,
            ''
        );

    if (!digits) {
        return null;
    }

    /*
     * Indian 10-digit number.
     */
    if (digits.length === 10) {
        digits =
            `${defaultCountryCode}${digits}`;
    }

    /*
     * Handle 0-prefixed Indian numbers:
     * 09876543210
     */
    if (
        digits.length === 11 &&
        digits.startsWith('0')
    ) {
        digits =
            `${defaultCountryCode}${digits.slice(
                1
            )}`;
    }

    return digits;
}

/**
 * Send an approved WhatsApp template.
 *
 * parameters:
 * [
 *   "Test Patient",
 *   "10 Sep 2026",
 *   "10:00 AM"
 * ]
 */
export async function sendWhatsAppTemplate({
    phone,
    templateName,
    parameters = [],
    languageCode = 'en',
}) {
    /*
     * Don't crash the booking system when
     * WhatsApp isn't configured yet.
     */
    if (!isWhatsAppConfigured()) {
        console.warn(
            `[WhatsApp skipped] Configuration missing. Template: ${templateName}`
        );

        return {
            success: false,
            skipped: true,
            reason:
                'WhatsApp configuration missing.',
        };
    }

    const recipient =
        normalizeWhatsAppPhone(phone);

    if (!recipient) {
        console.error(
            'Invalid WhatsApp phone:',
            phone
        );

        return {
            success: false,
            skipped: true,
            reason:
                'Invalid phone number.',
        };
    }

    const bodyParameters =
        parameters.map(
            (parameter) => ({
                type: 'text',
                text: String(
                    parameter ?? ''
                ),
            })
        );

    const components = [];

    if (
        bodyParameters.length > 0
    ) {
        components.push({
            type: 'body',
            parameters:
                bodyParameters,
        });
    }

    const payload = {
        messaging_product:
            'whatsapp',

        to: recipient,

        type: 'template',

        template: {
            name: templateName,

            language: {
                code: languageCode,
            },

            components,
        },
    };

    try {
        const response =
            await fetch(
                `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
                {
                    method: 'POST',

                    headers: {
                        Authorization:
                            `Bearer ${accessToken}`,

                        'Content-Type':
                            'application/json',
                    },

                    body:
                        JSON.stringify(
                            payload
                        ),
                }
            );

        const result =
            await response.json();

        if (!response.ok) {
            console.error(
                'WhatsApp API error:',
                result
            );

            return {
                success: false,
                skipped: false,
                status:
                    response.status,
                error:
                    result,
            };
        }

        console.log(
            'WhatsApp message sent:',
            result
        );

        return {
            success: true,
            skipped: false,
            data:
                result,
        };
    } catch (error) {
        console.error(
            'WhatsApp request failed:',
            error
        );

        return {
            success: false,
            skipped: false,
            error:
                error.message,
        };
    }
}
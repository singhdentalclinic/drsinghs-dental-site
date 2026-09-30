import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const accessToken =
            process.env.WHATSAPP_ACCESS_TOKEN;

        const phoneNumberId =
            process.env.WHATSAPP_PHONE_NUMBER_ID;

        const apiVersion =
            process.env.WHATSAPP_API_VERSION;

        const recipient =
            '918449830107';

        const response = await fetch(
            `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
            {
                method: 'POST',

                headers: {
                    Authorization:
                        `Bearer ${accessToken}`,

                    'Content-Type':
                        'application/json',
                },

                body: JSON.stringify({
                    messaging_product:
                        'whatsapp',

                    to: recipient,

                    type: 'template',

                    template: {
                        /*
                         * Meta normally provides a default
                         * test template in the getting
                         * started setup.
                         *
                         * Commonly this has historically
                         * been "hello_world", but use the
                         * exact test template currently
                         * shown in your Meta dashboard.
                         */
                        name: 'hello_world',

                        language: {
                            code: 'en_US',
                        },
                    },
                }),
            }
        );

        const result =
            await response.json();

        console.log(
            'WhatsApp test result:',
            result
        );

        return NextResponse.json(
            result,
            {
                status:
                    response.status,
            }
        );
    } catch (error) {
        console.error(
            'WhatsApp test error:',
            error
        );

        return NextResponse.json(
            {
                message:
                    error.message,
            },
            {
                status: 500,
            }
        );
    }
}
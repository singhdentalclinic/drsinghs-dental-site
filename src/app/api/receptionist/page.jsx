import { redirect } from 'next/navigation';

import {
    createClient,
} from '@/lib/supabase/server';

import ReceptionistDashboard from './ReceptionistDashboard';

export const metadata = {
    title:
        'Receptionist Dashboard | Singh Dental Clinic',

    description:
        'Manage appointment requests for Singh Dental Clinic.',
};

export default async function ReceptionistPage() {
    const supabase =
        await createClient();

    const {
        data: { user },
    } =
        await supabase.auth.getUser();

    if (!user) {
        redirect(
            '/receptionist/login'
        );
    }

    return (
        <ReceptionistDashboard />
    );
}
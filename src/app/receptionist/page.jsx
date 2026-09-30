import {
    redirect,
} from 'next/navigation';

import {
    requireStaff,
} from '@/lib/auth/requireStaff';

import ReceptionistDashboard from './ReceptionistDashboard';

export const metadata = {
    title:
        'Receptionist Dashboard | Singh Dental Clinic',

    description:
        'Manage appointment requests for Singh Dental Clinic.',
};

export default async function ReceptionistPage() {
    const auth =
        await requireStaff();

    if (
        auth.status === 401
    ) {
        redirect(
            '/receptionist/login'
        );
    }

    if (
        !auth.authorized
    ) {
        redirect('/');
    }

    return (
        <ReceptionistDashboard />
    );
}
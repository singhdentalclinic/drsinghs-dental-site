import {
    createClient,
} from '@/lib/supabase/server';

export async function requireStaff() {
    const supabase =
        await createClient();

    const {
        data: { user },
        error: userError,
    } =
        await supabase.auth.getUser();

    if (
        userError ||
        !user
    ) {
        return {
            authorized: false,
            status: 401,
            message: 'Unauthorized.',
            user: null,
            staff: null,
        };
    }

    const {
        data: staff,
        error: staffError,
    } = await supabase
        .from('staff_profiles')
        .select(`
      id,
      full_name,
      role,
      is_active
    `)
        .eq('id', user.id)
        .maybeSingle();

    if (
        staffError ||
        !staff
    ) {
        return {
            authorized: false,
            status: 403,
            message: 'Staff access required.',
            user,
            staff: null,
        };
    }

    if (!staff.is_active) {
        return {
            authorized: false,
            status: 403,
            message: 'Staff account is inactive.',
            user,
            staff,
        };
    }

    if (
        ![
            'receptionist',
            'admin',
        ].includes(staff.role)
    ) {
        return {
            authorized: false,
            status: 403,
            message:
                'You do not have permission to access this area.',
            user,
            staff,
        };
    }

    return {
        authorized: true,
        status: 200,
        message: null,
        user,
        staff,
    };
}
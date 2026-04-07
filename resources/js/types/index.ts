import type { auth } from './model/auth';
import type { flash } from './model/flash';

export type * from './auth';

export type AppNotification = {
    id: string;
    type: string;
    data: Record<string, unknown> & {
        message?: string;
        action_url?: string;
    };
    read_at: string | null;
    created_at: string;
};

export type PageProps = {
    flash: flash;
    auth: auth;
    notifications: {
        unreadCount: number;
    };
};

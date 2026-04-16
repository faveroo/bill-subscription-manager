import type { auth } from '../model/auth';
import type { Subscription } from '../model/subscription';
import type { Evento } from '../model/event';

export type PageProps = {
    subscriptions?: Subscription[];
    totalSubscriptions?: number;
    valueOfSubscriptions?: number;
    auth?: auth;
    events: Record<string, Evento[]>;
};

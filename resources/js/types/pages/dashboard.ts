import type { auth } from '../model/auth';
import type { Subscription } from '../model/subscription';

export type PageProps = {
    subscriptions?: Subscription[];
    totalSubscriptions?: number;
    valueOfSubscriptions?: number;
    auth?: auth;
};

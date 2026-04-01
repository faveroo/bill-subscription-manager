import { Subscription } from "../model/subscription";
import { auth } from "../model/auth"

export type PageProps = {
    subscriptions?: Subscription[];
    totalSubscriptions?: number;
    valueOfSubscriptions?: number;
    auth?: auth
};
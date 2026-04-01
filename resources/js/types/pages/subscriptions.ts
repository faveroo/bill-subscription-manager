import { Subscription } from "../model/subscription";

export type PageProps = {
    subscriptions?: Subscription[];
};

export type SubscriptionInfoProps = PageProps & {
    subscription: Subscription;
};
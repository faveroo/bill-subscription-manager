import { category } from "../model/category";
import { Subscription } from "../model/subscription";

export type PageProps = {
    subscriptions?: Subscription[];
    categories?: category[];
};

export type SubscriptionInfoProps = PageProps & {
    subscription: Subscription;
};
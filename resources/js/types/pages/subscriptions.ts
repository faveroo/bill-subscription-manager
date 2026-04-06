import type { BillingCycle } from '../model/billingCycle';
import type { category } from '../model/category';
import type { Subscription } from '../model/subscription';

export type PageProps = {
    subscriptions?: Subscription[];
    categories?: category[];
};

export type SubscriptionInfoProps = PageProps & {
    subscription: Subscription;
};

export type EditSubscriptionPageProps = {
    subscription: Subscription;
    billingCycles: BillingCycle[];
};

export type NewSubscriptionPageProps = {
    billingCycles: BillingCycle[];
    categories: category[];
};

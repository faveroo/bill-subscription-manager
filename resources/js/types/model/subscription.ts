import { BillingCycle } from './billingCycle';
import { category } from './category';

export type Subscription = {
    id: number;
    name: string;
    price: number;
    last_billing?: string;
    next_billing_date: string;
    billing_cycle?: BillingCycle;
    category?: category
};

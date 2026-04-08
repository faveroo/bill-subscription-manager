import { BillingCycle } from './billingCycle';
import { category } from './category';

export type Subscription = {
    id: number;
    name: string;
    price: number;
    is_active: boolean;
    last_billing?: string | Date;
    next_billing_date: string;
    billing_cycle?: BillingCycle;
    category?: category
};

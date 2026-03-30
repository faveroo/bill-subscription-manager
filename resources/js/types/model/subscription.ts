import { BillingCycle } from "./billingCycle";

export type Subscription = {
    id: number;
    name: string;
    price: number;
    billingCycle?: BillingCycle;
};
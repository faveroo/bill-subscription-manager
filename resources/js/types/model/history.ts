import { Subscription } from "./subscription"

export type History = {
    id: number;
    amount: number;
    billing_date: string;
    type: 'A' | 'C' | 'P';
    subscription: Subscription;
}
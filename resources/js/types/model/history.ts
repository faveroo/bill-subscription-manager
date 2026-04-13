import { Subscription } from "./subscription"

export type History = {
    id: number;
    amount: number;
    event_date: string;
    type: 'A' | 'C' | 'P' | 'R';
    subscription: Subscription;
}
import { Subscription } from "../model/subscription";

export type PageProps = {
    subscriptions?: Subscription[];
    totalSubscriptions?: number;
    valueOfSubscriptions?: number;

    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
};
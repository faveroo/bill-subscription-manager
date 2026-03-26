export type * from './auth';

export type Subscription = {
    id: number;
    name: string;
    price: number;
};

export type PageProps = {
    subscriptions?: Subscription[];

    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
};
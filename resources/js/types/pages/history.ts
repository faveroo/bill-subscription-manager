import type { History } from '../model/history';

export type HistoryPageProps = {
    histories: {
        data: History[];
        pagination: {
            current_page: number;
            from: number;
            last_page: number;
            per_page: number;
            to: number;
            total: number;
        };
        links: {
            url: string | null;
            page: number;
            label: string;
            active: boolean;
        }[];
    };
};
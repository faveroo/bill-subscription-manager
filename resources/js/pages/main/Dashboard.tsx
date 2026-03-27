import { Head } from "@inertiajs/react";
import type { ReactNode } from "react";

import MainLayout from "../../layouts/MainLayout";
import DashboardPage from "./dashboard/DashboardPage";

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <DashboardPage />
        </>
    );
}

Dashboard.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;


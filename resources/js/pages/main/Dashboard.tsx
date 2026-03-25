import { Head } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import { ReactNode } from "react";

export default function Dashboard() {
    return <Head title="Dashboard" />;
}

Dashboard.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
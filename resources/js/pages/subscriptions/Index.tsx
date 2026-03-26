import { Head } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import { ReactNode } from "react";

export default function Assinaturas() {
    return <Head title="Assinaturas" />;
}

Assinaturas.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
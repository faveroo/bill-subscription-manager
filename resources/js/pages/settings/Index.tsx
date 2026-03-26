import { Head } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import { ReactNode } from "react";

export default function Configuracoes() {
    return <Head title="Configurações" />;
}

Configuracoes.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
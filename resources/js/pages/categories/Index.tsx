import { Head } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import { ReactNode } from "react";

export default function Categorias() {
    return <Head title="Categorias" />;
}

Categorias.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
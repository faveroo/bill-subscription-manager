import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import MainLayout from '../../layouts/MainLayout';

export default function Relatorios() {
    return <Head title="Relatórios" />;
}

Relatorios.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;


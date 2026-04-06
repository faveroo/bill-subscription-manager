import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import MainLayout from '../../layouts/MainLayout';

export default function Configuracoes() {
    return <Head title="Configurações" />;
}

Configuracoes.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;


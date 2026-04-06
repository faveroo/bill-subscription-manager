import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import MainLayout from '../../layouts/MainLayout';

export default function Categorias() {
    return <Head title="Categorias" />;
}

Categorias.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;


import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';

export default function Profile() {
    const { props }  = usePage<PageProps>();
    const user = props?.auth?.user;
    return (
        <>
            <Head title="Perfil" />

            <div className="max-w-xl mx-auto">
                <div className="h-32 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>
                <div className="text-center -mt-12 ">
                    <div className="ml-2 text-center items-center">
                        <div className="ml-3 w-24 h-24 rounded-full bg-white border-4 border-white"></div>
                        <h1 className="text-2xl font-bold">Informations</h1>
                        <label htmlFor="E-mail" className='text-xl'>E-mail</label>
                        <span className="text-lg text-gray-400 ml-10">{user?.email}</span>
                    </div>
                </div>
            </div>
        </>
        
    );
}

Profile.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;


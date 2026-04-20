import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';
import { formatDate } from '../../lib/utils';

export default function Profile() {
    const { props }  = usePage<PageProps>();
    const user = props?.auth?.user;
    return (
        <>
            <Head title={`Perfil • ${user?.name}`} />

            <div className="max-w-xl mx-auto">
                <div className="h-32 rounded-2xl bg-gradient-to-br from-zinc-900/70 via-stone-800 to-zinc-900/10"></div>
                <div className="-mt-12 px-4">
                    <div className="flex items-end gap-5">
                        <div className="ml-3 w-24 h-24 rounded-full"><img src={`/storage/profile.png`} alt="Profile Image"/></div>
                        <div className="pb-1">
                            <span className="text-2xl text-white">{user?.name}</span>
                        </div>
                    </div>

                    <div className="mt-6 p-5 rounded-2xl bg-zinc-900/10 space-y-4 md:mx-12">
                        <h1 className="text-2xl text-white font-bold text-center">
                            Informations
                        </h1>

                        {/* Email */}
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-300">E-mail</span>
                            <span className="text-white">
                                {user?.email}
                            </span>
                        </div>

                        {/* Created At */}
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-300">Criado em</span>
                            <span className="text-gray-400">
                                {formatDate(user?.created_at)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}

Profile.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;


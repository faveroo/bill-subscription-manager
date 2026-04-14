import { Head, router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { formatDate, formatCurrencyBRL } from '@/lib/utils';
import MainLayout from '../../layouts/MainLayout';
import type { HistoryPageProps } from '../../types/pages/history';
import { historyMeta } from '@/config/historyMeta';

export default function Historico() {
    const { props } = usePage<HistoryPageProps>();
    const histories = props.histories.data;
    const links = props.histories.links;
    return (
        <>
            <Head title="Histórico" />

            <div className="p-3">
                {histories.map((item) => {
                    const meta = historyMeta[item.type];
                    return (
                        <>
                            <div className="grid grid-cols-5 p-3 gap-5 mb-2 text-white bg-zinc-800 rounded-md">
                                <div className="col-span-4">{item.subscription.name}</div>
                                <div className={`col-span-1 text-center rounded-full ${meta.className}`}>{meta.label}</div>
                                <div className="col-span-3 text-sm text-zinc-400">{formatDate(item.event_date)}</div>
                            </div>
                        </>
                    )
                })}
                <div className="flex bg-zinc-800 p-2 rounded-md justify-between mt-4">
                    {links.map((link, i) => (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-3 py-1 rounded-sm text-white cursor-pointer hover:bg-zinc-700 transition-colors ${link.active ? 'bg-zinc-900' : 'bg-zinc-800'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </>
    );

}

Historico.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;


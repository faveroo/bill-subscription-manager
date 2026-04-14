import { Head, router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { formatDate } from '@/lib/utils';
import { getSubscriptionIcon } from '@/icons/subscriptionIcons';
import MainLayout from '../../layouts/MainLayout';
import type { HistoryPageProps } from '../../types/pages/history';
import { historyMeta } from '@/config/historyMeta';

export default function Historico() {
    const { props } = usePage<HistoryPageProps>();
    const { data: histories, links } = props.histories;

    type HistoryItem = typeof histories[number];

    const getLocalYYYYMMDD = (d: string | number | Date) => {
        const dateObj = new Date(d);
        const ptBR = dateObj.toLocaleDateString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const [day, month, year] = ptBR.split('/');
        return `${year}-${month}-${day}`;
    };

    const grouped = histories.reduce<Record<string, HistoryItem[]>>((acc, item) => {
        const rawDate = getLocalYYYYMMDD(item.event_date);

        if (!acc[rawDate]) acc[rawDate] = [];
        acc[rawDate].push(item);

        return acc;
    }, {});

    const formatGroupDate = (date: string) => {
        const today = getLocalYYYYMMDD(Date.now());
        const yesterday = getLocalYYYYMMDD(Date.now() - 86400000);

        if (date === today) return 'Hoje';
        if (date === yesterday) return 'Ontem';

        return new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };
    console.log(grouped)
    return (
        <>
            <Head title="Histórico" />

            {histories.length === 0 ? (
                <div className="text-center text-zinc-500 mt-10">
                    Nenhum histórico encontrado.
                </div>
            ) : (
                <div className="p-3 space-y-6">
                    {Object.entries(grouped).map(([date, items]) => (
                        <div key={date}>
                            <div className="mb-5">
                                <div className="text-xl font-bold text-zinc-300 capitalize">
                                    {formatGroupDate(date)} <hr />
                                </div>
                            </div>

                            <div className="space-y-2">
                                {items.map((item) => {
                                    const meta = historyMeta[item.type];

                                    return (
                                        <div
                                            key={item.id}
                                            className="grid grid-cols-5 items-center p-3 gap-3 text-white bg-zinc-800 rounded-md hover:bg-zinc-900 transition-colors"
                                        >
                                            <div className="col-span-3 font-semibold text-xl">
                                                <span className="flex items-center gap-2">{getSubscriptionIcon(item.subscription.name)} {item.subscription.name}</span>
                                            </div>

                                            <div className={`text-center col-span-2 text-xs px-2 py-1 rounded-full ${meta.className}`}>
                                                {meta.label}
                                            </div>

                                            <div className="grid grid-cols-2 border-t pt-2 border-zinc-400 col-span-5">
                                                <div className="text-xs text-left text-zinc-400">
                                                    {meta.description(item, item.subscription.billing_cycle?.name)}
                                                </div>

                                                <div className="text-xs text-right text-zinc-400">
                                                    {formatDate(item.event_date)}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    <div className="flex flex-wrap gap-2 bg-zinc-800 p-3 rounded-md justify-center">
                        {links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 rounded text-sm transition-colors
                                ${link.active
                                        ? 'bg-zinc-900 text-white'
                                        : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                                    }
                                ${!link.url && 'opacity-50 cursor-not-allowed'}
                            `}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

Historico.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
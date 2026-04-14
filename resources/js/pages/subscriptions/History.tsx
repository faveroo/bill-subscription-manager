import { Head, Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { formatDate } from '@/lib/utils';
import type { SubscriptionHistoryProps } from '@/types/pages/subscriptions';
import MainLayout from '../../layouts/MainLayout';
import { historyMeta } from '@/config/historyMeta';

export default function History() {
    const { props } = usePage<SubscriptionHistoryProps>();
    const subscription = props.subscription;
    const histories = props.histories;

    return (
        <>
            <Head title={`Histórico • ${subscription?.name}`} />

            <div className="max-w-3xl mx-auto p-4 space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Histórico da assinatura
                        </h1>
                        <p className="text-zinc-400">
                            {subscription?.name}
                        </p>
                    </div>

                    <Link
                        href="/subscriptions"
                        className="text-sm text-zinc-400 hover:text-white"
                    >
                        ← Voltar
                    </Link>
                </div>

                {/* Lista */}
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl overflow-hidden">

                    {histories.length === 0 ? (
                        <div className="p-6 text-center text-zinc-400">
                            Nenhuma cobrança registrada.
                        </div>
                    ) : (
                        <ul className="divide-y divide-zinc-700">
                            {histories.map((item) => {
                                const meta = historyMeta[item.type];

                                return (
                                    <li
                                        key={item.id}
                                        className="flex items-center justify-between p-4 hover:bg-zinc-800/70 transition"
                                    >
                                        <div className="flex flex-col">

                                            <div className="flex items-center gap-3">
                                                <p className="text-white font-medium">
                                                    {meta.description(item, item.subscription.billing_cycle?.name)}
                                                </p>

                                            </div>

                                            {/* Data */}
                                            <p className="text-xs text-zinc-500 mt-1">
                                                {formatDate(item.event_date)}
                                            </p>
                                        </div>

                                        <p className={`text-[11px] px-2 py-0.5 rounded-full ${meta.className}`}>
                                            {meta.label}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

History.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
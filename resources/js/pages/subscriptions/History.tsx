import { Head, Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { formatDate, formatCurrencyBRL } from '@/lib/utils';
import type { SubscriptionHistoryProps } from '@/types/pages/subscriptions';
import MainLayout from '../../layouts/MainLayout';

export default function History() {
    const { props } = usePage<SubscriptionHistoryProps>();
    const histories = props.histories;
    console.log(histories);

    return (
        <>
            <Head title={`Histórico • ${histories[0].subscription?.name}`} />

            <div className="max-w-3xl mx-auto p-4 space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Histórico de cobranças
                        </h1>
                        <p className="text-zinc-400">
                            {histories[0].subscription?.name}
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
                            {histories.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center justify-between p-4 hover:bg-zinc-800 transition"
                                >
                                    <div>
                                        <p className="text-white font-medium">
                                            R$ {formatCurrencyBRL(item.amount)}
                                        </p>
                                        <p className="text-sm text-zinc-400">
                                            {formatDate(item.billing_date)}
                                        </p>
                                    </div>

                                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400">
                                        Pago
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

History.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
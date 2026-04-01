import { Head, Link, router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import type { SubscriptionInfoProps } from '@/types/pages/subscriptions';
import { getSubscriptionIcon } from '@/icons/subscriptionIcons';
import MainLayout from '../../layouts/MainLayout';

function formatCurrencyBRL(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

function formatDateBR(value?: string) {
    if (!value) return '—';

    const [year, month, day] = value.split('-');

    if (!year || !month || !day) {
        return value;
    }

    return `${day}/${month}/${year}`;
}

export default function SubscriptionInfo() {
    const { props } = usePage<SubscriptionInfoProps>();
    const subscription = props.subscription;
    const billingCycleName = subscription.billing_cycle?.name ?? '—';

    function handleDelete() {
        if (!confirm('Tem certeza que deseja excluir esta assinatura?')) return;
        router.delete(`/subscription/${subscription.id}`);
    }

    return (
        <>
            <Head title={`Assinatura • ${subscription.name}`} />

            <div className="mx-auto w-full max-w-4xl space-y-6">
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <div className="flex items-center gap-3">
                            <Link
                                href="/subscriptions"
                                className="rounded border border-zinc-500/70 px-3 py-1 text-sm text-white transition-colors hover:border-zinc-400"
                            >
                                Voltar
                            </Link>
                        </div>

                        <h1 className="mt-3 truncate text-3xl font-bold text-white">
                            {subscription.name}
                        </h1>
                    </div>

                    <div className="text-white/95">
                        {getSubscriptionIcon(subscription.name, {
                            size: 64,
                            title: subscription.name,
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4">
                        <p className="text-sm text-zinc-300">Preço</p>
                        <p className="mt-1 text-2xl font-semibold text-white">
                            {formatCurrencyBRL(subscription.price)}
                        </p>
                    </div>

                    <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4">
                        <p className="text-sm text-zinc-300">
                            Próxima cobrança
                        </p>
                        <p className="mt-1 text-2xl font-semibold text-white">
                            {formatDateBR(subscription.next_billing_date)}
                        </p>
                    </div>

                    <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4">
                        <p className="text-sm text-zinc-300">Última cobrança</p>
                        <p className="mt-1 text-xl font-semibold text-white">
                            {formatDateBR(subscription.last_billing)}
                        </p>
                    </div>

                    <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4">
                        <p className="text-sm text-zinc-300">
                            Ciclo de cobrança
                        </p>
                        <p className="mt-1 text-xl font-semibold text-white">
                            {billingCycleName}
                        </p>
                    </div>
                </div>

                <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm text-zinc-300">Ações</div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="rounded border border-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-600"
                            >
                                Excluir assinatura
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

SubscriptionInfo.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

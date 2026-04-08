import { Head, Link, router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { getSubscriptionIcon } from '@/icons/subscriptionIcons';
import type { SubscriptionInfoProps } from '@/types/pages/subscriptions';
import MainLayout from '../../layouts/MainLayout';

function formatCurrencyBRL(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

function formatDateBR(value?: string) {
    if (!value) {
        return '—';
    }

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

    function handleToggleActive() {
        const nextActionLabel = subscription.is_active ? 'inativar' : 'ativar';

        if (
            !confirm(
                `Tem certeza que deseja ${nextActionLabel} esta assinatura?`,
            )
        ) {
            return;
        }

        router.patch(`/subscriptions/${subscription.id}/toggle-active`);
    }

    return (
        <>
            <Head title={`Assinatura • ${subscription.name}`} />

            <div className="mx-auto w-full max-w-4xl space-y-4">
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

                        <div className="inline-flex items-center gap-5 mt-2">
                        <h1 className="mt-2 truncate text-3xl font-bold text-white">
                            {subscription.name}
                        </h1>
                            <div className="mt-2">
                                {subscription.category?.name ? (
                                    <span className="items-center rounded-full bg-zinc-800/20 px-2.5 py-1 text-xs text-zinc-200 ring-1 ring-white/10">
                                        {subscription.category.name}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0 text-white/95">
                        {getSubscriptionIcon(subscription.name, {
                            size: 64,
                            title: subscription.name,
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                            <Link
                                href={`/subscriptions/${subscription.id}/edit/`}
                                className="rounded border border-blue-600 px-4 py-2 text-center text-sm text-white transition-colors hover:bg-blue-600"
                            >
                                Editar
                            </Link>

                            <button
                                type="button"
                                onClick={handleToggleActive}
                                className={`rounded border px-4 py-2 text-sm text-white transition-colors ${subscription.is_active ? 'hover:bg-red-600 border-red-600' : 'hover:bg-green-600 border-green-600'}`}
                            >
                                {subscription.is_active
                                    ? 'Inativar assinatura'
                                    : 'Ativar assinatura'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

SubscriptionInfo.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

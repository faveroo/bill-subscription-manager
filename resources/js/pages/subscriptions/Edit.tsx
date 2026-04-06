import { Head, Link, useForm } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { getSubscriptionIcon } from '@/icons/subscriptionIcons';
import type { EditSubscriptionPageProps } from '@/types/pages/subscriptions';
import MainLayout from '../../layouts/MainLayout';

export default function EditSubscription({
    subscription,
    billingCycles,
}: EditSubscriptionPageProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: subscription.name ?? '',
        price: String(subscription.price ?? ''),
        billing_cycle_id: String(subscription.billing_cycle?.id ?? ''),
        last_billing: subscription.last_billing ?? '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/subscriptions/${subscription.id}`);
    }

    return (
        <>
            <Head title={`Editar • ${subscription.name}`} />

            <div className="mx-auto w-full max-w-xl space-y-4">
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <Link
                            href={`/subscriptions/${subscription.id}`}
                            className="inline-flex items-center rounded border border-zinc-500/70 px-3 py-1 text-sm text-white transition-colors hover:border-zinc-400"
                        >
                            Voltar
                        </Link>
                        <h1 className="mt-3 truncate text-2xl font-semibold text-white">
                            Editar assinatura
                        </h1>
                    </div>

                    <div className="shrink-0 text-white/95">
                        {getSubscriptionIcon(data.name, {
                            size: 48,
                            title: data.name || 'Assinatura',
                        })}
                    </div>
                </div>

                <div className="rounded-2xl bg-zinc-600 p-6 shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-white">
                                Nome
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className={`w-full rounded-lg border p-2 text-white transition-colors focus:border-zinc-400 focus:ring-1 focus:outline-none ${
                                    errors.name
                                        ? 'border-red-500 ring-1 ring-red-500'
                                        : 'border-zinc-400'
                                }`}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-white">
                                Preço (R$)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.price}
                                onChange={(e) =>
                                    setData('price', e.target.value)
                                }
                                className={`w-full rounded-lg border p-2 text-white transition-colors focus:border-zinc-400 focus:ring-1 focus:outline-none ${
                                    errors.price
                                        ? 'border-red-500 ring-1 ring-red-500'
                                        : 'border-zinc-400'
                                }`}
                            />
                            {errors.price && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.price}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-white">
                                    Ciclo de cobrança
                                </label>
                                <select
                                    value={data.billing_cycle_id}
                                    onChange={(e) =>
                                        setData(
                                            'billing_cycle_id',
                                            e.target.value,
                                        )
                                    }
                                    className={`w-full rounded-lg border p-2 pb-3 text-center text-white transition-colors focus:border-zinc-400 focus:ring-1 focus:outline-none ${
                                        errors.billing_cycle_id
                                            ? 'border-red-500 ring-1 ring-red-500'
                                            : 'border-zinc-400'
                                    }`}
                                >
                                    <option value="">Selecione</option>
                                    {billingCycles.map((cycle) => (
                                        <option key={cycle.id} value={cycle.id}>
                                            {cycle.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.billing_cycle_id && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.billing_cycle_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-white">
                                    Última cobrança
                                </label>
                                <input
                                    type="date"
                                    value={data.last_billing}
                                    onChange={(e) =>
                                        setData('last_billing', e.target.value)
                                    }
                                    className={`w-full rounded-lg border p-2 text-white transition-colors focus:border-zinc-400 focus:ring-1 focus:outline-none ${
                                        errors.last_billing
                                            ? 'border-red-500 ring-1 ring-red-500'
                                            : 'border-zinc-400'
                                    }`}
                                />
                                {errors.last_billing && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.last_billing}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full cursor-pointer rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
                        >
                            {processing ? 'Salvando...' : 'Salvar alterações'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

EditSubscription.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

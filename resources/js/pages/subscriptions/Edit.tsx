import { Head, Link, useForm } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { getSubscriptionIcon } from '@/icons/subscriptionIcons';
import { cn } from '@/lib/utils';
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

    const fieldBase =
        'h-11 w-full rounded-xl bg-zinc-800 px-3 text-white ring-1 ring-white/10 placeholder:text-zinc-400 transition focus:bg-zinc-800 focus:ring-2 focus:ring-white/15 focus:outline-none';
    const fieldError =
        'ring-2 ring-rose-500/40 ring-offset-0 focus:ring-2 focus:ring-rose-500/40';

    const fieldClass = (hasError: boolean) =>
        cn(fieldBase, hasError ? fieldError : null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/subscriptions/${subscription.id}`);
    }

    return (
        <>
            <Head title={`Editar • ${subscription.name}`} />

            <div className="mx-auto w-full max-w-2xl space-y-4 text-zinc-100">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <Link
                            href={`/subscriptions/${subscription.id}`}
                            className="inline-flex items-center rounded-xl bg-white/5 px-3 py-1 text-sm text-white ring-1 ring-white/10 transition-colors hover:bg-white/10"
                        >
                            Voltar
                        </Link>
                        <h1 className="mt-3 truncate text-2xl font-semibold tracking-tight text-white">
                            Editar assinatura
                        </h1>
                        <p className="mt-1 text-sm text-zinc-400">
                            Atualize os dados da assinatura e salve as
                            alterações.
                        </p>
                    </div>

                    <div className="shrink-0">
                        <div className="rounded-xl bg-white/5 p-3 text-zinc-200 ring-1 ring-white/10">
                            {getSubscriptionIcon(data.name, {
                                size: 26,
                                title: data.name || 'Assinatura',
                            })}
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-zinc-900/35 p-6 shadow-sm shadow-black/30 ring-1 ring-white/5">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-white">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className={fieldClass(!!errors.name)}
                                />
                                {errors.name ? (
                                    <p className="mt-1 text-sm text-rose-200">
                                        {errors.name}
                                    </p>
                                ) : null}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-white">
                                    Preço (R$)
                                </label>
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData('price', e.target.value)
                                    }
                                    className={fieldClass(!!errors.price)}
                                />
                                {errors.price ? (
                                    <p className="mt-1 text-sm text-rose-200">
                                        {errors.price}
                                    </p>
                                ) : null}
                            </div>

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
                                    className={cn(
                                        fieldClass(!!errors.billing_cycle_id),
                                        'appearance-none',
                                    )}
                                >
                                    <option
                                        value=""
                                        className="bg-zinc-900 text-white"
                                    >
                                        Selecione
                                    </option>
                                    {billingCycles.map((cycle) => (
                                        <option
                                            key={cycle.id}
                                            value={cycle.id}
                                            className="bg-zinc-900 text-white"
                                        >
                                            {cycle.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.billing_cycle_id ? (
                                    <p className="mt-1 text-sm text-rose-200">
                                        {errors.billing_cycle_id}
                                    </p>
                                ) : null}
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
                                    className={fieldClass(!!errors.last_billing)}
                                />
                                {errors.last_billing ? (
                                    <p className="mt-1 text-sm text-rose-200">
                                        {errors.last_billing}
                                    </p>
                                ) : null}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row sm:justify-end">
                            <Link
                                href={`/subscriptions/${subscription.id}`}
                                className="inline-flex w-full items-center justify-center rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition-colors hover:bg-white/10 sm:w-auto"
                            >
                                Cancelar
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-full items-center justify-center rounded-xl bg-sky-500/20 px-4 py-2 text-sm font-medium text-sky-100 ring-1 ring-sky-500/25 transition-colors hover:bg-sky-500/25 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                            >
                                {processing ? 'Salvando…' : 'Salvar alterações'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

EditSubscription.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

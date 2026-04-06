import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent, ReactNode } from 'react';
import { useMemo } from 'react';
import { getSubscriptionIcon } from '@/icons/subscriptionIcons';
import type { BillingCycle } from '@/types/model/billingCycle';
import type { category } from '@/types/model/category';
import MainLayout from '../../layouts/MainLayout';

type Props = {
    billingCycles: BillingCycle[];
    categories: category[];
};

function parseIsoDate(value: string) {
    const [year, month, day] = value.split('-').map((part) => Number(part));

    if (!year || !month || !day) {
        return null;
    }

    return new Date(year, month - 1, day);
}

function formatDateBR(date: Date) {
    return new Intl.DateTimeFormat('pt-BR').format(date);
}

function addBillingCycle(lastBilling: Date, billingCycleName: string) {
    const normalized = billingCycleName.trim().toLowerCase();

    if (normalized.includes('mensal')) {
        return new Date(
            lastBilling.getFullYear(),
            lastBilling.getMonth() + 1,
            lastBilling.getDate(),
        );
    }

    if (normalized.includes('anual')) {
        return new Date(
            lastBilling.getFullYear() + 1,
            lastBilling.getMonth(),
            lastBilling.getDate(),
        );
    }

    if (normalized.includes('semanal')) {
        return new Date(
            lastBilling.getFullYear(),
            lastBilling.getMonth(),
            lastBilling.getDate() + 7,
        );
    }

    return null;
}

export default function NewSubscription({ billingCycles, categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        billing_cycle_id: '',
        category_id: '',
        last_billing: new Date().toISOString().split('T')[0],
    });

    const inputClass = (hasError: boolean, extraClasses = '') =>
        `w-full rounded-md bg-zinc-900 border p-2 text-white outline-none transition ${extraClasses} ${
            hasError
                ? 'border-red-500/80 ring-1 ring-red-500/30'
                : 'border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
        }`;

    const nextBillingPreview = useMemo(() => {
        if (!data.last_billing || !data.billing_cycle_id) {
            return null;
        }

        const cycle = billingCycles.find(
            (item) => String(item.id) === data.billing_cycle_id,
        );

        if (!cycle) {
            return null;
        }

        const lastBilling = parseIsoDate(data.last_billing);

        if (!lastBilling) {
            return null;
        }

        const nextBilling = addBillingCycle(lastBilling, cycle.name);

        if (!nextBilling) {
            return null;
        }

        return formatDateBR(nextBilling);
    }, [billingCycles, data.billing_cycle_id, data.last_billing]);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/subscriptions');
    }

    return (
        <>
            <Head title="Nova Assinatura" />

            <div className="mx-auto w-full max-w-xl space-y-4">
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <Link
                            href="/subscriptions"
                            className="inline-flex items-center rounded border border-zinc-500/70 px-3 py-1 text-sm text-white transition-colors hover:border-zinc-400"
                        >
                            Voltar
                        </Link>
                        <h1 className="mt-3 truncate text-2xl font-semibold text-white">
                            Nova assinatura
                        </h1>
                    </div>

                    <div className="shrink-0 text-white/95 transition-transform duration-200 hover:scale-110">
                        {getSubscriptionIcon(data.name, {
                            size: 48,
                            title: data.name || 'Assinatura',
                        })}
                    </div>
                </div>

                <div className="rounded-xl bg-zinc-800 p-6 shadow-lg border border-zinc-700 hover:border-zinc-500 transition">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-white">
                                Nome
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: Netflix"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className={inputClass(!!errors.name)}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-white">
                                Preço (R$)
                            </label>
                            <input
                                type="number"
                                placeholder="Ex: 39.90"
                                step="0.01"
                                value={data.price}
                                onChange={(e) =>
                                    setData('price', e.target.value)
                                }
                                className={inputClass(!!errors.price)}
                            />
                            {errors.price && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.price}
                                </p>
                            )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-white">
                                Categoria
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) =>
                                    setData(
                                        'category_id',
                                        e.target.value,
                                    )
                                }
                                className={inputClass(!!errors.category_id)}
                            >
                                <option value="">Selecione</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>

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
                                    className={inputClass(
                                        !!errors.billing_cycle_id,
                                        'p-3',
                                    )}
                                >
                                    <option value="">Selecione</option>
                                    {billingCycles.map((cycle) => (
                                        <option key={cycle.id} value={cycle.id}>
                                            {cycle.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.billing_cycle_id && (
                                    <p className="mt-1 text-sm text-red-400">
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
                                    className={inputClass(
                                        !!errors.last_billing,
                                        'p-2.5',
                                    )}
                                />
                                {errors.last_billing && (
                                    <p className="mt-1 text-sm text-red-400">
                                        {errors.last_billing}
                                    </p>
                                )}
                            </div>
                        </div>

                        {nextBillingPreview && (
                            <p className="text-sm text-zinc-400">
                                Próxima cobrança: {nextBillingPreview}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? (
                                <span className="animate-pulse">Salvando...</span>
                            ) : (
                                'Criar assinatura'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

NewSubscription.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

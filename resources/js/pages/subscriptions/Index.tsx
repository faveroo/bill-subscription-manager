import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import SubscriptionCard from '@/components/subscriptions/SubscriptionCard';
import type { Subscription } from '@/types/model/subscription';
import type { PageProps } from '@/types/pages/subscriptions';
import MainLayout from '../../layouts/MainLayout';

export default function Assinaturas() {
    const { props } = usePage<PageProps>();
    const subscriptions = props.subscriptions || [];
    const categories = props.categories || [];

    const [nameFilter, setNameFilter] = useState('');
    const [billingCycleFilter, setBillingCycleFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const money = useMemo(
        () =>
            new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }),
        [],
    );

    const filteredSubscriptions = subscriptions.filter((sub) => {
        const matchesName = sub.name
            .toLowerCase()
            .includes(nameFilter.toLowerCase());

        const matchesBillingCycle = billingCycleFilter
            ? sub.billing_cycle?.name === billingCycleFilter
            : true;

        const matchesDate = dateFilter
            ? sub.next_billing_date === dateFilter
            : true;

        const matchesCategory = categoryFilter
            ? sub.category?.name === categoryFilter
            : true;

        return (
            matchesName && matchesBillingCycle && matchesDate && matchesCategory
        );
    });

    const { processing } = useForm({});

    function handleToggleActive(subscription: Subscription) {
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
            <Head title="Assinaturas" />

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h1 className="text-2xl font-semibold tracking-tight text-white">
                    Minhas Assinaturas
                </h1>
                <Link
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white ring-1 ring-white/10 transition-colors hover:bg-white/10"
                    href="/subscriptions/new"
                >
                    +
                </Link>
            </div>

            {subscriptions.length === 0 ? (
                <p className="text-gray-400">Nenhuma assinatura encontrada.</p>
            ) : (
                <>
                    <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <input
                            type="text"
                            placeholder="Buscar por nome"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                            className="h-11 rounded-xl bg-zinc-800 px-3 text-white ring-1 ring-white/10 placeholder:text-zinc-400 focus:ring-2 focus:ring-white/15 focus:outline-none"
                        />

                        <select
                            value={billingCycleFilter}
                            onChange={(e) =>
                                setBillingCycleFilter(e.target.value)
                            }
                            className="h-11 appearance-none rounded-xl bg-zinc-800 px-3 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-white/15 focus:outline-none"
                        >
                            <option value="" className="bg-zinc-900 text-white">
                                Todos
                            </option>
                            <option
                                value="Mensal"
                                className="bg-zinc-900 text-white"
                            >
                                Mensal
                            </option>
                            <option
                                value="Anual"
                                className="bg-zinc-900 text-white"
                            >
                                Anual
                            </option>
                        </select>

                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="h-11 rounded-xl bg-zinc-800 px-3 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-white/15 focus:outline-none"
                        />

                        <select
                            value={categoryFilter}
                            onChange={(e) =>
                                setCategoryFilter(e.target.value)
                            }
                            className="h-11 appearance-none rounded-xl bg-zinc-800 px-3 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-white/15 focus:outline-none"
                        >
                            <option value="" className="bg-zinc-900 text-white">
                                Todas as categorias
                            </option>
                            {categories.map((cat) => (
                                <option
                                    key={cat.id}
                                    value={cat.name}
                                    className="bg-zinc-900 text-white"
                                >
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {filteredSubscriptions.length === 0 ? (
                        <p className="text-sm text-zinc-300">
                            Nenhuma assinatura com esses filtros.
                        </p>
                    ) : (
                        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                            {filteredSubscriptions.map((subscription) => (
                                <SubscriptionCard
                                    key={subscription.id}
                                    subscription={subscription}
                                    priceLabel={money.format(subscription.price)}
                                    nextBillingLabel={
                                        subscription.next_billing_date
                                    }
                                    processing={processing}
                                    handler={handleToggleActive}
                                />
                            ))}
                        </ul>
                    )}
                </>
            )}
        </>
    );
}

Assinaturas.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

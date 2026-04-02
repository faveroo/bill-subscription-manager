import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { getSubscriptionIcon } from '@/icons/subscriptionIcons';
import type { PageProps } from '@/types/pages/subscriptions';
import MainLayout from '../../layouts/MainLayout';

export default function Assinaturas() {
    const { props } = usePage<PageProps>();
    const subscriptions = props.subscriptions || [];

    const [nameFilter, setNameFilter] = useState('');
    const [billingCycleFilter, setBillingCycleFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

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

        return matchesName && matchesBillingCycle && matchesDate;
    });

    const { processing } = useForm();

    function handleDelete(id: number, e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!confirm('Tem certeza que deseja excluir?')) return;

        router.delete(`/subscription/${id}`);
    }
    return (
        <>
            <Head title="Assinaturas" />

            <h1 className="mb-4 text-2xl font-bold text-white">
                Minhas Assinaturas{' '}
                <Link
                    className="m-3 rounded border-2 border-zinc-600 px-2 transition-colors hover:border-zinc-500"
                    href={'/subscriptions/new'}
                >
                    +
                </Link>{' '}
            </h1>
            {subscriptions.length === 0 ? (
                <p className="text-gray-400">Nenhuma assinatura encontrada.</p>
            ) : (
                <>
                    <div className="mb-4 flex gap-4">
                        {/* Nome */}
                        <input
                            type="text"
                            placeholder="Buscar por nome"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                            className="rounded bg-zinc-800 p-2 text-white"
                        />

                        {/* Ciclo de cobrança */}
                        <select
                            value={billingCycleFilter}
                            onChange={(e) =>
                                setBillingCycleFilter(e.target.value)
                            }
                            className="rounded bg-zinc-800 p-2 text-white"
                        >
                            <option value="">Todos</option>
                            <option value="Mensal">Mensal</option>
                            <option value="Anual">Anual</option>
                        </select>

                        {/* Data */}
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="rounded bg-zinc-800 p-2 text-white"
                        />
                    </div>
                    <ul className="space-y-4">
                        {filteredSubscriptions.map((subscription) => (
                            <li
                                key={subscription.id}
                                className="rounded bg-zinc-800 p-4"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <Link
                                            className="cursor-pointer text-xl font-bold text-white"
                                            href={`/subscriptions/${subscription.id}`}
                                        >
                                            {subscription.name}
                                        </Link>
                                        <p className="text-gray-400">
                                            Preço: R$ {subscription.price}
                                        </p>
                                        <p className="text-gray-400">
                                            Ciclo de cobrança:{' '}
                                            {subscription.billing_cycle?.name}
                                        </p>
                                        <p className="text-gray-400">
                                            Próxima cobrança:{' '}
                                            {subscription.next_billing_date}
                                        </p>
                                    </div>

                                    <div className="shrink-0 text-2xl text-white">
                                        {getSubscriptionIcon(subscription.name)}
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end gap-2 border-t border-zinc-700 pt-3">
                                    <Link
                                        href={`/subscriptions/${subscription.id}/edit/`}
                                        className="w-full cursor-pointer rounded border border-stone-600 px-3 py-1 text-center text-white transition-colors hover:bg-stone-600"
                                    >
                                        Editar
                                    </Link>

                                    <button
                                        onClick={(e) =>
                                            handleDelete(subscription.id, e)
                                        }
                                        className="w-full cursor-pointer rounded border border-red-600/50 px-3 py-1 text-white transition-colors hover:bg-red-600/50"
                                        disabled={processing}
                                    >
                                        <p>
                                            {processing
                                                ? 'Excluindo'
                                                : 'Excluir'}
                                        </p>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}

Assinaturas.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

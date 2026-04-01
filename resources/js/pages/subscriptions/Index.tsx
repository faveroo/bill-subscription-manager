import { Head, Link, usePage } from "@inertiajs/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { getSubscriptionIcon } from "@/icons/subscriptionIcons";
import type { PageProps } from "@/types/pages/subscriptions";
import MainLayout from "../../layouts/MainLayout";

export default function Assinaturas() {
    const { props } = usePage<PageProps>();
    const subscriptions = props.subscriptions || [];

    const [nameFilter, setNameFilter] = useState("");
    const [billingCycleFilter, setBillingCycleFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");

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
    return (
        <>
            <Head title="Assinaturas" />

            <h1 className="text-2xl text-white font-bold mb-4">Minhas Assinaturas <Link className="m-3 border-2 border-zinc-600 rounded px-2 hover:border-zinc-500 transition-colors" href={'/subscriptions/new'}>+</Link> </h1>
            {subscriptions.length === 0 ? (
                <p className="text-gray-400">Nenhuma assinatura encontrada.</p>
            ) : (
            <> 
                <div className="flex gap-4 mb-4">
                    {/* Nome */}
                    <input
                        type="text"
                        placeholder="Buscar por nome"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        className="p-2 rounded bg-zinc-800 text-white"
                    />

                    {/* Ciclo de cobrança */}
                    <select
                        value={billingCycleFilter}
                        onChange={(e) => setBillingCycleFilter(e.target.value)}
                        className="p-2 rounded bg-zinc-800 text-white"
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
                        className="p-2 rounded bg-zinc-800 text-white"
                    />
                </div>
                <ul className="space-y-4">
                    {filteredSubscriptions.map((subscription) => (
                        <li key={subscription.id} className="bg-zinc-800 p-4 rounded-lg">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <Link
                                        className="text-xl text-white font-bold cursor-pointer"
                                        href={`/subscriptions/${subscription.id}`}
                                        >
                                        {subscription.name}
                                    </Link>
                                    <p className="text-gray-400">Preço: R$ {subscription.price}</p>
                                    <p className="text-gray-400">
                                        Ciclo de cobrança: {subscription.billing_cycle?.name}
                                    </p>
                                    <p className="text-gray-400">
                                        Próxima cobrança: {subscription.next_billing_date}
                                    </p>
                                </div>

                                <div className="text-2xl text-white shrink-0">
                                    {getSubscriptionIcon(subscription.name)}
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-zinc-700 flex justify-end gap-2">
                                <button className="border border-blue-600 w-full text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-600 transition-colors">
                                    Editar
                                </button>

                                <button className="border border-red-600 w-full text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600 transition-colors">
                                    Excluir
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

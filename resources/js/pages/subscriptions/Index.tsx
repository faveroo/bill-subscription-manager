import { Head } from "@inertiajs/react";
import { PageProps } from "@/types/pages/subscriptions";
import MainLayout from "../../layouts/MainLayout";
import { ReactNode } from "react";
import { usePage } from "@inertiajs/react";

export default function Assinaturas() {
    const { props } = usePage<PageProps>();
    const subscriptions = props.subscriptions || [];
    return (
        <>
            <Head title="Assinaturas" />

                <h1 className="text-2xl text-white font-bold mb-4">Minhas Assinaturas</h1>
                {subscriptions.length === 0 ? (
                    <p className="text-gray-400">Nenhuma assinatura encontrada.</p>
                ) : (
                    <ul className="space-y-4">
                        {subscriptions.map((subscription) => (
                            <li key={subscription.id} className="bg-gray-800 p-4 rounded-lg">
                                <h2 className="text-xl text-white font-bold">{subscription.name}</h2>
                                <p className="text-gray-400">Preço: R$ {subscription.price}</p>
                                <p className="text-gray-400">Ciclo de cobrança: {subscription.billingCycle?.name}</p>
                            </li>
                        ))}
                    </ul>
                )}
        </>
    );
}

Assinaturas.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types/pages/subscriptions";
import MainLayout from "../../layouts/MainLayout";
import { ReactNode } from "react";
import { usePage, Link } from "@inertiajs/react";

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
                            <li key={subscription.id} className="bg-zinc-800 flex flex-col p-4 rounded-lg">
                                <div>
                                    <Link 
                                        className="text-xl text-white font-bold cursor-pointer"
                                        href={`/subscriptions/${subscription.id}`}
                                    >{subscription.name}</Link>
                                    <p className="text-gray-400">Preço: R$ {subscription.price}</p>
                                    <p className="text-gray-400">Ciclo de cobrança: {subscription.billing_cycle?.name}</p>
                                    <p className="text-gray-400">Próxima cobrança: {subscription.next_billing_date}</p>
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
                )}
        </>
    );
}

Assinaturas.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
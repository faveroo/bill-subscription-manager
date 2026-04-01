import { Head } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import { ReactNode } from "react";
import { useForm } from "@inertiajs/react";

type BillingCycle = {
    id: number;
    name: string;
};

type Props = {
    billingCycles: BillingCycle[];
};

export default function NewSubscription({ billingCycles }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        price: "",
        billing_cycle_id: "",
        last_billing: ""
    })

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        post("/subscriptions");
    }

    return (
        <>
        <div className="max-w-xl mx-auto mt-10 bg-zinc-600 shadow-md rounded-2xl p-6">
            <h1 className="text-2xl text-white font-semibold mb-6">
                Nova Assinatura
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Nome */}
                <div>
                    <label className="block text-white text-sm font-medium mb-1">
                        Nome
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={`w-full text-white border rounded-lg p-2 focus:outline-none foucs:ring-1 focus:border-zinc-400 transition-colors ${
                            errors.name ? "border-red-500 ring-1 ring-red-500" : "border-zinc-400"
                        }`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Preço */}
                <div>
                    <label className="block text-white text-sm font-medium mb-1">
                        Preço (R$)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        className={`w-full text-white border rounded-lg p-2 focus:outline-none foucs:ring-1 focus:border-zinc-400 transition-colors ${
                            errors.price ? "border-red-500 ring-1 ring-red-500" : "border-zinc-400"
                        }`}
                    />
                    {errors.price && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.price}
                        </p>
                    )}
                </div>

                {/* Billing Cycle */}
                <div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-white text-sm font-medium mb-1">
                                Ciclo de Cobrança
                            </label>
                            <select
                                value={data.billing_cycle_id}
                                onChange={(e) =>
                                    setData("billing_cycle_id", e.target.value)
                                }
                                className={`w-full text-white border rounded-lg p-2 pb-3 text-center focus:outline-none foucs:ring-1 focus:border-zinc-400 transition-colors ${
                                    errors.billing_cycle_id
                                    ? "border-red-500 ring-1 ring-red-500"
                                    : "border-zinc-400"
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
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.billing_cycle_id}
                                </p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-white text-sm font-medium mb-1">
                                Última cobrança
                            </label>
                            <input 
                                type="date"
                                value={data.last_billing}
                                onChange={(e) => setData("last_billing", e.target.value)}
                                className={`w-full text-white border rounded-lg p-2 focus:outline-none foucs:ring-1 focus:border-zinc-400 transition-colors ${
                                    errors.last_billing
                                        ? "border-red-500 ring-1 ring-red-500"
                                        : "border-zinc-400"
                                }`}
                            />
                            {errors.last_billing && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.last_billing}
                                </p>
                            )}
                        </div>
                    </div>

                    
                </div>

                {/* Botão */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    {processing ? "Salvando..." : "Criar Assinatura"}
                </button>
            </form>
        </div>
        </>
    );
}

NewSubscription.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
import { Head, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import MainLayout from "../../layouts/MainLayout";
import { ReactNode } from "react";
import SubsCard from "./partials/SubsCard";

export default function Dashboard() {
    const { props } = usePage<PageProps>();


    console.log(props);

    return (
        <>
            <Head title="Dashboard" /> 
            <h1 className="text-2xl text-white font-bold mb-4">Dashboard</h1>
            {props.subscriptions && props.subscriptions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {props.subscriptions.map(subscription => (
                        <SubsCard key={subscription.id} subscription={subscription} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">Nenhuma assinatura encontrada.</p>
            )}
        </>
    );
}

Dashboard.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
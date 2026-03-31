import { Link, Head, usePage } from "@inertiajs/react";
import { ReactNode } from "react";
import type { PageProps } from "@/types/pages/subscriptions";
import MainLayout from "../../layouts/MainLayout";

export default function SubscriptionInfo() {
    const { props } = usePage<PageProps>();
    const subscription = props.subscription || [];
    return (
        <>
            <Head title="Assinatura"/>
        </>
    )
}

SubscriptionInfo.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
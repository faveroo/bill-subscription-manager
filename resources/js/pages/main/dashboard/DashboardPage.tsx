import { Link, usePage } from "@inertiajs/react";
import type { PageProps } from "@/types/pages/dashboard";
import { Subscription } from "@/types/model/subscription";

import { Card } from "./components/Card";
import { IconAlert, IconArrowRight, IconPlus, IconSpark, IconWallet } from "./components/Icons";
import { MetricCard } from "./components/MetricCard";
import { cn } from "./lib/cn";
import { parseDateOnly } from "./lib/date";

type DashboardSubscription = Subscription & {
    next_billing_date?: string | null;
    billing_cycle?: string | null;
    description?: string | null;
};

function startOfDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export default function DashboardPage() {
    const { props } = usePage<PageProps>();

    const subscriptions = (props.subscriptions ?? []) as DashboardSubscription[];
    const today = startOfDay(new Date());
    const sumDays = new Date(today);
    sumDays.setDate(today.getDate() + 10);
    const formatted = sumDays.toLocaleDateString("pt-BR");

    const money = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const dateLong = new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const dayMonth = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" });

    const userName = (props as any)?.auth?.user?.name as string | undefined;

    const overdue = subscriptions
        .map((s) => parseDateOnly(s.next_billing_date))
        .filter((d): d is Date => Boolean(d))
        .filter((d) => d < today);

    const activeCount = subscriptions.length || props.totalSubscriptions || 0;
    const totalMonthly = props.valueOfSubscriptions ?? 0;
    const overdueCount = overdue.length;

    return (
        <div className="space-y-6 text-zinc-100">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm text-zinc-300">Olá{userName ? `, ${userName}` : ""}</p>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">Visão geral</h1>
                    <p className="mt-1 text-sm text-zinc-400 capitalize">{dateLong.format(today)}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Link
                        href="/subscriptions/new"
                        className={cn(
                            "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium",
                            "bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-500/25",
                            "hover:bg-emerald-500/20 transition-colors",
                        )}
                    >
                        <IconPlus className="h-4 w-4" />
                        Nova assinatura
                    </Link>
                    <Link
                        href="/subscriptions"
                        className={cn(
                            "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium",
                            "bg-white/5 text-zinc-100 ring-1 ring-white/10 hover:bg-white/10 transition-colors",
                        )}
                    >
                        Ver assinaturas
                        <IconArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <MetricCard
                    label="Assinaturas ativas"
                    value={String(activeCount)}
                    helper="Do seu usuário"
                    icon={<IconSpark className="h-5 w-5" />}
                    accent="emerald"
                />
                <MetricCard
                    label="Total mensal"
                    value={money.format(totalMonthly)}
                    helper="Somatório atual das assinaturas"
                    icon={<IconWallet className="h-5 w-5" />}
                    accent="sky"
                />
                <MetricCard
                    label="Vencidas"
                    value={String(overdueCount)}
                    helper="Baseado em next_billing_date"
                    icon={<IconAlert className="h-5 w-5" />}
                    accent="rose"
                />
            </div>

            {/* All subscriptions */}
            <div className="space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-white">Assinaturas</h2>
                        <p className="mt-1 text-sm text-zinc-400">Lista com próximo vencimento e ciclo</p>
                    </div>
                    <p className="text-sm text-zinc-400">
                        {subscriptions.length ? `${subscriptions.length} item(ns)` : "Nenhuma assinatura"}
                    </p>
                </div>

                {subscriptions.length ? (
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {subscriptions.map((sub) => {
                            const nextDate = parseDateOnly(sub.next_billing_date);
                            const nextLabel = nextDate ? dayMonth.format(nextDate) : "Sem data";

                            return (
                                <Card key={sub.id} className="p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-white">{sub.name}</p>
                                            <p className="mt-1 text-sm font-semibold text-zinc-100">{money.format(sub.price)}</p>
                                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                                <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-200 ring-1 ring-white/10">
                                                    Próximo: {nextLabel}
                                                </span>
                                                {sub.billing_cycle ? (
                                                    <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-200 ring-1 ring-white/10">
                                                        Ciclo: {sub.billing_cycle.name}
                                                    </span>
                                                ) : null}
                                            </div>
                                            {sub.description ? (
                                                <p className="mt-3 line-clamp-2 text-xs text-zinc-400">{sub.description}</p>
                                            ) : null}
                                        </div>

                                        <div className="shrink-0">
                                            <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10 text-zinc-200">
                                                <IconWallet className="h-5 w-5" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <Card className="p-6">
                        <p className="text-sm font-medium text-white">Nenhuma assinatura com cobrança até {formatted}</p>
                        <p className="mt-1 text-sm text-zinc-400">
                            Crie sua primeira assinatura e comece a acompanhar gastos recorrentes.
                        </p>
                        <div className="mt-4">
                            <Link
                                href="/subscriptions/new"
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium",
                                    "bg-white/5 text-zinc-100 ring-1 ring-white/10 hover:bg-white/10 transition-colors",
                                )}
                            >
                                <IconPlus className="h-4 w-4" />
                                Ir para assinaturas
                            </Link>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}

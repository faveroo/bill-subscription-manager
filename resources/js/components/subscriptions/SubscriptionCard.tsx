import { Link } from '@inertiajs/react';
import { getSubscriptionIcon } from '@/icons/subscriptionIcons';
import { cn } from '@/lib/utils';
import type { Subscription } from '@/types/model/subscription';

function parseDateOnly(value?: string | null) {
    if (!value) {
        return null;
    }

    const [year, month, day] = value.split('-').map(Number);

    if (!year || !month || !day) {
        return null;
    }

    return new Date(year, month - 1, day);
}

export type SubscriptionCardProps = {
    subscription: Subscription;
    priceLabel: string;
    nextBillingLabel: string;
    processing?: boolean;
    onDelete: (subscriptionId: number) => void;
    className?: string;
};

export default function SubscriptionCard({
    subscription,
    priceLabel,
    nextBillingLabel,
    processing,
    onDelete,
    className,
}: SubscriptionCardProps) {
    const icon = getSubscriptionIcon(subscription.name, {
        size: 22,
        title: subscription.name,
        className: 'text-zinc-100',
    });

    const nextBillingDate = parseDateOnly(subscription.next_billing_date);
    const nextBillingShort = nextBillingDate
        ? nextBillingDate.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short',
          })
        : null;

    return (
        <li
            className={cn(
                'rounded-xl border border-white/10 bg-zinc-900/35 p-4 shadow-sm shadow-black/30 ring-1 ring-white/5 transition-colors hover:bg-zinc-900/45',
                className,
            )}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <Link
                        className="block truncate text-base font-semibold text-white/95 hover:text-white"
                        href={`/subscriptions/${subscription.id}`}
                    >
                        {subscription.name}
                    </Link>

                    <div className="mt-2 flex items-baseline gap-2">
                        <p className="text-lg font-semibold text-white">
                            {priceLabel}
                        </p>
                        {subscription.billing_cycle?.name ? (
                            <span className="text-sm text-zinc-300">
                                / {subscription.billing_cycle.name}
                            </span>
                        ) : null}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-200 ring-1 ring-white/10">
                            Próxima: {nextBillingShort ?? nextBillingLabel}
                        </span>
                        {subscription.category?.name ? (
                            <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-200 ring-1 ring-white/10">
                                {subscription.category.name}
                            </span>
                        ) : null}
                    </div>
                </div>

                {icon ? (
                    <div className="shrink-0 rounded-lg bg-white/5 p-3 text-zinc-200 ring-1 ring-white/10">
                        {icon}
                    </div>
                ) : null}
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-3 sm:flex-row sm:justify-end">
                <Link
                    href={`/subscriptions/${subscription.id}/edit/`}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition-colors hover:bg-white/10 sm:w-auto"
                >
                    Editar
                </Link>

                <button
                    type="button"
                    onClick={() => onDelete(subscription.id)}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-100 ring-1 ring-rose-500/25 transition-colors hover:bg-rose-500/15 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    disabled={processing}
                >
                    {processing ? 'Excluindo…' : 'Excluir'}
                </button>
            </div>
        </li>
    );
}


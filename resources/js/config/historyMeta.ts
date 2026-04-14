import { formatCurrencyBRL } from "@/lib/utils";

type HistoryType = 'R' | 'C' | 'P' | 'A';

export const historyMeta: Record<HistoryType, {
    label: string;
    description: (item: any) => string;
    className: string;
}> = {
    A: {
        label: 'Assinatura ativada',
        className: 'bg-blue-500/10 text-blue-400',
        description: (item) => `A assinatura foi iniciada pagando R$ ${formatCurrencyBRL(item.amount)} ${item.billing_cycle}.`,
    },
    C: {
        label: 'Assinatura cancelada',
        className: 'bg-red-500/10 text-red-400',
        description: () => 'A assinatura foi cancelada e não haverá novas cobranças.',
    },
    P: {
        label: 'Pagamento realizado',
        className: 'bg-green-500/10 text-green-400',
        description: (item) => `Pagamento de R$ ${formatCurrencyBRL(item.amount)} confirmado.`,
    },
    R: {
        label: 'Assinatura Reativada',
        className: 'bg-yellow-500/10 text-yellow-400',
        description: () => 'A assinatura foi ativada novamente.',
    }
};
import { usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import type { PageProps } from '@/types';

type FlashToast = {
    id: string;
    kind: 'success' | 'error';
    message: string;
};

export default function Header() {
    const { props } = usePage<PageProps>();
    const success = props.flash?.success;
    const error = props.flash?.error;
    const userName = props.auth?.user?.name || 'Usuário';

    const incomingToasts = useMemo<FlashToast[]>(() => {
        const next: FlashToast[] = [];

        if (success)
            next.push({
                id: `success-${Date.now()}`,
                kind: 'success',
                message: success,
            });
        if (error)
            next.push({
                id: `error-${Date.now()}`,
                kind: 'error',
                message: error,
            });

        return next;
    }, [success, error]);

    const [toasts, setToasts] = useState<FlashToast[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (incomingToasts.length === 0) return;

        setToasts(incomingToasts);
        setIsVisible(true);
    }, [incomingToasts]);

    useEffect(() => {
        if (!isVisible) return;

        const timeoutId = window.setTimeout(() => setIsVisible(false), 5000);
        return () => window.clearTimeout(timeoutId);
    }, [isVisible]);

    useEffect(() => {
        if (isVisible || toasts.length === 0) return;

        const timeoutId = window.setTimeout(() => setToasts([]), 200);
        return () => window.clearTimeout(timeoutId);
    }, [isVisible, toasts.length]);

    const dismiss = () => {
        setIsVisible(false);
    };

    return (
        <>
            <header className="flex h-16 items-center justify-end border-b bg-zinc-600 px-6">
                {/* Right */}
                <div className="flex items-center gap-4">
                    <button
                        className="text-lg"
                        type="button"
                        aria-label="Notificações"
                    >
                        🔔
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-300" />
                        <span className="text-sm text-white">{userName}</span>
                    </div>
                </div>
            </header>

            {toasts.length > 0 && (
                <div
                    className="pointer-events-none fixed top-20 right-6 z-50 flex w-[min(420px,calc(100vw-3rem))] flex-col gap-2"
                    aria-live="polite"
                    aria-relevant="additions text"
                >
                    {toasts.map((toast) => (
                        <div
                            key={toast.id}
                            className={[
                                'pointer-events-auto flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur transition-all duration-200',
                                isVisible
                                    ? 'translate-y-0 opacity-100'
                                    : '-translate-y-1 opacity-0',
                                toast.kind === 'success'
                                    ? 'border-emerald-500/60 bg-emerald-600/95 text-white'
                                    : 'border-red-500/60 bg-red-600/95 text-white',
                            ].join(' ')}
                            role="alert"
                        >
                            <span className="shrink-0 mt-0.5" aria-hidden="true">
                                {toast.kind === 'success' ? '✓' : '!'}
                            </span>

                            <div className="min-w-0 mt-1 flex-1 text-sm leading-5">
                                {toast.message}
                            </div>

                            <button
                                type="button"
                                onClick={dismiss}
                                className="shrink-0 rounded p-1 text-white/90 hover:text-white focus:ring-2 focus:ring-white/70 focus:outline-none"
                                aria-label="Fechar"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

import { usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import type { PageProps } from '@/types';

type FlashToast = {
    id: string;
    kind: 'success' | 'error';
    message: string;
};

function BellIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={className}
        >
            <path
                d="M10 20a2 2 0 0 0 4 0"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
            />
            <path
                d="M6.5 9.5a5.5 5.5 0 0 1 11 0v3.2c0 .8.3 1.5.9 2.1l.7.7c.6.6.2 1.5-.7 1.5H5.6c-.9 0-1.3-1-.7-1.5l.7-.7c.6-.6.9-1.3.9-2.1V9.5Z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function Header() {
    const { props } = usePage<PageProps>();
    const success = props.flash?.success;
    const error = props.flash?.error;
    const userName = props.auth?.user?.name ?? 'Usuário';

    const [toasts, setToasts] = useState<FlashToast[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const toastId = useRef(0);

    useEffect(() => {
        const next: FlashToast[] = [];

        if (success) {
            toastId.current += 1;
            next.push({
                id: `success-${toastId.current}`,
                kind: 'success',
                message: success,
            });
        }

        if (error) {
            toastId.current += 1;
            next.push({
                id: `error-${toastId.current}`,
                kind: 'error',
                message: error,
            });
        }

        if (next.length === 0) {
            return;
        }

        setToasts((prev) => [...prev, ...next]);
        setIsVisible(true);

    }, [success, error]);

    useEffect(() => {
        if (!isVisible) {
            return;
        }

        const timeoutId = window.setTimeout(() => setIsVisible(false), 5000);

        return () => window.clearTimeout(timeoutId);
    }, [isVisible]);

    useEffect(() => {
        if (isVisible || toasts.length === 0) {
            return;
        }

        const timeoutId = window.setTimeout(() => setToasts([]), 200);

        return () => window.clearTimeout(timeoutId);
    }, [isVisible, toasts]);

    const dismiss = () => {
        setIsVisible(false);
    };

    return (
        <>
            <header className="flex h-16 items-center justify-end border-b bg-zinc-600 px-6">
                <div className="flex items-center gap-4">
                    <button
                        className="rounded-lg p-2 text-white/90 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white/20 focus:outline-none"
                        type="button"
                        aria-label="Notificações"
                    >
                        <BellIcon className="h-5 w-5" />
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
                            <span
                                className="mt-0.5 shrink-0"
                                aria-hidden="true"
                            >
                                {toast.kind === 'success' ? '✓' : '!'}
                            </span>

                            <div className="mt-1 min-w-0 flex-1 text-sm leading-5">
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

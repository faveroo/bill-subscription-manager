import { usePage, Link } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { AppNotification, PageProps } from '@/types';

type FlashToast = {
    id: string;
    kind: 'success' | 'error';
    message: string;
};

function BellIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
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

function getCsrfToken(): string {
    return (
        document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content') ?? ''
    );
}

export default function Header({ onOpenSidebar }: { onOpenSidebar: () => void }) {
    const { props } = usePage<PageProps>();
    const success = props.flash?.success;
    const error = props.flash?.error;
    const userName = props.auth?.user?.name ?? 'Usuário';

    const [toasts, setToasts] = useState<FlashToast[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const toastId = useRef(0);

    const [isOpen, setIsOpen] = useState(false);
    const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(
        props.notifications?.unreadCount ?? 0,
    );

    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const dateTime = useMemo(
        () =>
            new Intl.DateTimeFormat('pt-BR', {
                dateStyle: 'short',
                timeStyle: 'short',
            }),
        [],
    );

    useEffect(() => {
        setUnreadCount(props.notifications?.unreadCount ?? 0);
    }, [props.notifications?.unreadCount]);

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

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        function onPointerDown(event: PointerEvent) {
            const target = event.target as Node | null;
            if (!target) {
                return;
            }

            if (menuRef.current?.contains(target) || buttonRef.current?.contains(target)) {
                return;
            }

            setIsOpen(false);
        }

        window.addEventListener('pointerdown', onPointerDown);
        return () => window.removeEventListener('pointerdown', onPointerDown);
    }, [isOpen]);

    async function loadNotifications() {
        setIsLoadingNotifications(true);
        try {
            const response = await fetch('/notifications?limit=10', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
            });

            if (!response.ok) {
                return;
            }

            const json = (await response.json()) as {
                unreadCount: number;
                notifications: AppNotification[];
            };

            setUnreadCount(json.unreadCount ?? 0);
            setNotifications(json.notifications ?? []);
        } finally {
            setIsLoadingNotifications(false);
        }
    }

    async function markAsRead(id: string) {
        const existing = notifications.find((n) => n.id === id);
        const wasUnread = existing ? existing.read_at == null : false;

        const response = await fetch(`/notifications/${id}/read`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': getCsrfToken(),
            },
            credentials: 'same-origin',
        });

        if (!response.ok && response.status !== 204) {
            return;
        }

        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read_at: n.read_at ?? new Date().toISOString() } : n)),
        );

        if (wasUnread) {
            setUnreadCount((prev) => Math.max(0, prev - 1));
        }
    }

    async function markAllAsRead() {
        const response = await fetch('/notifications/read-all', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': getCsrfToken(),
            },
            credentials: 'same-origin',
        });

        if (!response.ok && response.status !== 204) {
            return;
        }

        setUnreadCount(0);
        setNotifications((prev) =>
            prev.map((n) => ({ ...n, read_at: n.read_at ?? new Date().toISOString() })),
        );
    }

    function dismissToast() {
        setIsVisible(false);
    }

    async function toggleMenu() {
        const next = !isOpen;
        setIsOpen(next);
        if (next) {
            await loadNotifications();
        }
    }

    return (
        <>
            <header className="flex h-16 items-center justify-between md:justify-end border-b bg-zinc-600 px-3 md:px-6">
                {/* Hamburger — mobile only */}
                <button
                    type="button"
                    className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Abrir menu"
                    onClick={onOpenSidebar}
                >
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button
                            ref={buttonRef}
                            className="relative rounded-lg p-2 text-white/90 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white/20 focus:outline-none"
                            type="button"
                            aria-label="Notificações"
                            aria-haspopup="menu"
                            aria-expanded={isOpen}
                            onClick={() => void toggleMenu()}
                        >
                            <BellIcon className="h-5 w-5" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-semibold leading-5 text-white">
                                    {unreadCount > 99 ? '99+' : unreadCount}
                                </span>
                            )}
                        </button>

                        {isOpen && (
                            <>
                                {/* Mobile backdrop */}
                                <div
                                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                                    onClick={() => setIsOpen(false)}
                                    aria-hidden="true"
                                />

                                <div
                                    ref={menuRef}
                                    role="menu"
                                    aria-label="Notificações"
                                    className="fixed inset-x-0 bottom-0 z-50 overflow-hidden rounded-t-2xl border-t border-white/10 bg-zinc-900/95 shadow-xl backdrop-blur md:absolute md:inset-x-auto md:bottom-auto md:right-0 md:top-full md:mt-2 md:w-[420px] md:rounded-xl md:border"
                                >
                                    {/* Drag handle — mobile only */}
                                    <div className="flex justify-center pt-3 pb-1 md:hidden">
                                        <div className="h-1 w-10 rounded-full bg-white/20" />
                                    </div>

                                    <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                                        <div className="min-w-0">
                                            <div className="text-sm font-semibold text-white">
                                                Notificações
                                            </div>
                                            <div className="text-xs text-zinc-300">
                                                {unreadCount > 0
                                                    ? `${unreadCount} não lida(s)`
                                                    : 'Tudo em dia'}
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => void markAllAsRead()}
                                            className="shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-white/90 ring-1 ring-white/10 hover:bg-white/10 focus:ring-2 focus:ring-white/20 focus:outline-none"
                                            disabled={unreadCount === 0}
                                        >
                                            Marcar tudo como lido
                                        </button>
                                    </div>

                                <div className="max-h-[60vh] md:max-h-[420px] overflow-auto">
                                    {isLoadingNotifications ? (
                                        <div className="px-4 py-6 text-sm text-zinc-300">
                                            Carregando…
                                        </div>
                                    ) : notifications.length === 0 ? (
                                        <div className="px-4 py-6 text-sm text-zinc-300">
                                            Nenhuma notificação.
                                        </div>
                                    ) : (
                                        <ul className="divide-y divide-white/10">
                                            {notifications.map((notification) => {
                                                const href = (notification.data?.action_url as string | undefined) ?? undefined;
                                                const message =
                                                    (notification.data?.message as string | undefined) ??
                                                    'Você tem uma nova notificação.';
                                                const isUnread = notification.read_at == null;

                                                return (
                                                    <li key={notification.id}>
                                                        <a
                                                            href={href ?? '#'}
                                                            onClick={(e) => {
                                                                if (href) {
                                                                    e.preventDefault();
                                                                    void markAsRead(notification.id).finally(() => {
                                                                        window.location.href = href;
                                                                    });
                                                                    return;
                                                                }

                                                                e.preventDefault();
                                                                void markAsRead(notification.id);
                                                            }}
                                                            className={[
                                                                'block px-4 py-3 transition-colors hover:bg-white/5 focus:bg-white/5 focus:outline-none',
                                                                isUnread ? 'bg-white/[0.03]' : '',
                                                            ].join(' ')}
                                                            role="menuitem"
                                                        >
                                                            <div className="flex items-start gap-3">
                                                                <div
                                                                    className={[
                                                                        'mt-1 h-2 w-2 shrink-0 rounded-full',
                                                                        isUnread ? 'bg-rose-500' : 'bg-zinc-600',
                                                                    ].join(' ')}
                                                                    aria-hidden="true"
                                                                />

                                                                <div className="min-w-0 flex-1">
                                                                    <div className="text-sm text-white">
                                                                        {message}
                                                                    </div>
                                                                    <div className="mt-1 text-xs text-zinc-400">
                                                                        {dateTime.format(new Date(notification.created_at))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                                </div>
                            </>
                        )}
                    </div>

                        <Link href="/profile" className="text-sm flex items-center gap-2 text-white hover:underline">
                        <div className="h-8 w-8 rounded-full bg-gray-300" />
                            <span className='hidden md:block'>{userName}</span>
                        </Link>
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
                                isVisible ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0',
                                toast.kind === 'success'
                                    ? 'border-emerald-500/60 bg-emerald-600/95 text-white'
                                    : 'border-red-500/60 bg-red-600/95 text-white',
                            ].join(' ')}
                            role="alert"
                        >
                            <span className="mt-0.5 shrink-0" aria-hidden="true">
                                {toast.kind === 'success' ? '✓' : '!'}
                            </span>

                            <div className="mt-1 min-w-0 flex-1 text-sm leading-5">
                                {toast.message}
                            </div>

                            <button
                                type="button"
                                onClick={dismissToast}
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


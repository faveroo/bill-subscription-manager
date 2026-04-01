import { usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import type { PageProps } from "@/types";

type FlashToast = {
  id: string;
  kind: "success" | "error";
  message: string;
};

export default function Header() {
  const { props } = usePage<PageProps>();
  const success = props.flash?.success;
  const error = props.flash?.error;
  const userName = props.auth?.user?.name || "Usuário";

  const incomingToasts = useMemo<FlashToast[]>(() => {
    const next: FlashToast[] = [];

    if (success) next.push({ id: `success-${Date.now()}`, kind: "success", message: success });
    if (error) next.push({ id: `error-${Date.now()}`, kind: "error", message: error });

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
      <header className="h-16 bg-zinc-600 border-b flex items-center justify-end px-6">

        {/* Right */}
          <div className="flex items-center gap-4">
            <button className="text-lg" type="button" aria-label="Notificações">
              🔔
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <span className="text-sm text-white">{userName}</span>
            </div>
          </div>
      </header>

      {toasts.length > 0 && (
        <div
          className="fixed top-20 right-6 z-50 flex w-[min(420px,calc(100vw-3rem))] flex-col gap-2 pointer-events-none"
          aria-live="polite"
          aria-relevant="additions text"
        >
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={[
                "pointer-events-auto flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur transition-all duration-200",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
                toast.kind === "success"
                  ? "bg-emerald-600/95 text-white border-emerald-500/60"
                  : "bg-red-600/95 text-white border-red-500/60",
              ].join(" ")}
              role="alert"
            >
              <span className="shrink-0" aria-hidden="true">
                {toast.kind === "success" ? "✓" : "!"}
              </span>

              <div className="min-w-0 flex-1 text-sm leading-5">{toast.message}</div>

              <button
                type="button"
                onClick={dismiss}
                className="shrink-0 rounded p-1 text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70"
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

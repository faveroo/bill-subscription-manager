import type { ReactNode } from "react";

import { cn } from "../lib/cn";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <section
            className={cn(
                "rounded-2xl border border-white/10 bg-zinc-800/40",
                className,
            )}
        >
            {children}
        </section>
    );
}


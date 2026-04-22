import type { ReactNode } from "react";

import { cn } from "../lib/cn";
import { Card } from "./Card";

export function MetricCard({
    label,
    value,
    helper,
    icon,
    accent,
}: {
    label: string;
    value: string;
    helper?: string;
    icon: ReactNode;
    accent: "emerald" | "sky" | "rose";
}) {
    const accentClasses =
        accent === "emerald"
            ? "text-emerald-200 bg-emerald-500/10 ring-emerald-500/20"
            : accent === "sky"
              ? "text-sky-200 bg-sky-500/10 ring-sky-500/20"
              : "text-rose-200 bg-rose-500/10 ring-rose-500/20";

    return (
        <Card className="py-5 px-4">
            <div className="flex items-start justify-between">
                <div >
                    <p className="text-sm text-zinc-300">{label}</p>
                    <p className="mt-2 text-3xl font-semibold tracking-wide text-white">{value}</p>
                    {helper ? <p className="mt-1 text-xs text-zinc-400">{helper}</p> : null}
                </div>
                <div className={cn("rounded-xl p-2 ring-2", accentClasses)}>{icon}</div>
            </div>
        </Card>
    );
}


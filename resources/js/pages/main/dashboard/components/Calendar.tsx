import Calendar from "react-calendar";
import { useState } from "react";
import type { Evento } from "@/types/model/event";
import { getSubscriptionIcon } from "@/icons/subscriptionIcons";


type MyCalendarProps = {
  events: Record<string, Evento[]>;
};

export default function MyCalendar( { events } : MyCalendarProps ) {
  const [date, setDate] = useState(new Date());

  function formatDate(d: Date) {
    return d.toISOString().split("T")[0];
  }

  return (
    <div>

        <div className="mb-4">
            <h2 className="text-lg font-semibold capitalize">
                {date.toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: 'numeric',
                    month: "long",
                    year: "numeric",
                })}
            </h2>
        </div>
        <Calendar
        value={date}
        onChange={(v) => v instanceof Date && setDate(v)}
        showNavigation={true}
        className="
        w-full
        bg-zinc-900
        text-zinc-200
        rounded-2xl
        p-4
        ring-1 ring-white/10
        "
        tileClassName={({ date, view }) => {
            if (view !== "month") return "";
            
            const f = formatDate(date);
            const items = events[f];
            
            const hasPayable = items?.some(e => e.type === "payable");
            
            return [
                "relative rounded-xl hover:bg-zinc-800",
                hasPayable && "!bg-rose-500/10 text-rose-400",
                ].join(" ");
            }}
            tileContent={({ date, view }) => {
                if (view !== "month") return null;
                
                const f = formatDate(date);
                const items = events[f];
                
                if(!items) return;
                
                const icons = items?.map(e => getSubscriptionIcon(e.label)).filter(item => item !== null);
                return (
                    <div className="absolute bottom-1 right-1 flex items-center">
                <div className="flex -space-x-2">
                    {icons.slice(0, 3).map((icon, i) => (
                        <div
                        key={i}
                        className="w-5 h-5 overflow-hidden flex items-center justify-center text-[10px]"
                        >
                        {icon}
                    </div>
                    ))}
                </div>

                {items.length > 3 && (
                    <span className="ml-1 text-[10px] text-zinc-400">
                    +{items.length - 3}
                    </span>
                )}
            </div>
            );
        }}
        />
    </div>
  );
}
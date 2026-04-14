import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import type { ReactNode } from "react";

type SidebarItem = {
  label: string;
  href: string;
};


function Icon({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

const iconsByHref: Record<string, ReactNode> = {
  "/dashboard": (
    <Icon title="Dashboard">
      <path d="M4 13h6V4H4v9z" />
      <path d="M14 20h6v-7h-6v7z" />
      <path d="M14 11h6V4h-6v7z" />
      <path d="M4 20h6v-5H4v5z" />
    </Icon>
  ),
  "/subscriptions": (
    <Icon title="Assinaturas">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h4" />
    </Icon>
  ),
  "/history": (
    <Icon title="Histórico">
      <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6" />
      <path d="M16 4h4v4" />
      <path d="M20 4l-8 8" />
    </Icon>
  ),
  "/reports": (
    <Icon title="Relatórios">
      <path d="M4 19V5" />
      <path d="M8 19V9" />
      <path d="M12 19v-4" />
      <path d="M16 19V7" />
      <path d="M20 19V11" />
    </Icon>
  ),
  "/settings": (
    <Icon title="Configurações">
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
      <path d="M19.4 15a7.8 7.8 0 0 0 .1-1 7.8 7.8 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a8 8 0 0 0-1.7-1l-.4-2.6H10l-.4 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.5 2 1.5a7.8 7.8 0 0 0-.1 1 7.8 7.8 0 0 0 .1 1l-2 1.5 2 3.5 2.4-1c.5.4 1.1.7 1.7 1l.4 2.6h4l.4-2.6c.6-.3 1.2-.6 1.7-1l2.4 1 2-3.5-2-1.5z" />
    </Icon>
  ),
};

const labelsByHref: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/subscriptions": "Assinaturas",
  "/history": "Histórico",
  "/reports": "Relatórios",
  "/settings": "Configurações",
};

export default function Sidebar() {
  const { url } = usePage();
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const current = pendingUrl ?? url;
  const isActive = (path: string) => current.startsWith(path);

  const [open, setOpen] = useState<boolean>(true);

  const items: SidebarItem[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Assinaturas", href: "/subscriptions" },
    { label: "Histórico", href: "/history" },
    { label: "Relatórios", href: "/reports" },
    { label: "Configurações", href: "/settings" },
  ];

  return (
    <aside
      className={`h-screen bg-zinc-600 border-r transition-all duration-300 flex flex-col ${open ? "w-54" : "w-20"
        }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b">
        <span className="text-xl font-bold text-white">
          <Link href="/dashboard">{open ? "SubManager" : "$"}</Link>
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-5 gap-5 flex flex-col">
        {items.map((item) => (
          <Link href={item.href} key={item.href} onClick={() => setPendingUrl(item.href)}>
            <div className={`flex items-center gap-5 px-2 py-3 rounded cursor-pointer hover:bg-zinc-500 transition-colors ${isActive(item.href) ? "bg-zinc-700 transition" : ""}`}>
              <span className={`grid place-items-center ${!open ? "w-full" : ""}`}>
                {iconsByHref[item.href]}
              </span>
              {open && (
                <span className="text-sm text-white">
                  {labelsByHref[item.href]}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>

      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="m-3 p-2 border rounded text-sm hover:bg-zinc-500 transition-colors text-white"
      >
        {open ? "Fechar" : "Abrir"}
      </button>
    </aside>
  );
}

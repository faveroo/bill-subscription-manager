import { Link } from "@inertiajs/react";
import { useState } from "react";

type SidebarItem = {
  label: string;
  icon: string;
  href: string;
};

export default function Sidebar() {
  const [open, setOpen] = useState<boolean>(true);

  const items: SidebarItem[] = [
    { label: "Dashboard", icon: "🏠", href: "/dashboard" },
    { label: "Assinaturas", icon: "💳", href: "/subscriptions" },
    { label: "Categorias", icon: "🏷", href: "/categories" },
    { label: "Relatórios", icon: "📊", href: "/reports" },
    { label: "Configurações", icon: "⚙️", href: "/settings" },
  ];

  return (
    <aside
      className={`h-screen bg-zinc-600 border-r transition-all duration-300 flex flex-col ${
        open ? "w-54" : "w-20"
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
        {items.map((item, index) => (
          <Link href={item.href} key={index}>
            <div className="flex items-center gap-5 p-3 rounded cursor-pointer hover:bg-zinc-500 transition-colors">
              <span>{item.icon}</span>
              {open && <span className="text-sm text-white">{item.label}</span>}
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
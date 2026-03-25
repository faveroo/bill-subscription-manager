import { useState } from "react";

type SidebarItem = {
  label: string;
  icon: string;
};

export default function Sidebar() {
  const [open, setOpen] = useState<boolean>(true);

  const items: SidebarItem[] = [
    { label: "Dashboard", icon: "🏠" },
    { label: "Assinaturas", icon: "💳" },
    { label: "Categorias", icon: "🏷" },
    { label: "Relatórios", icon: "📊" },
    { label: "Configurações", icon: "⚙️" },
  ];

  return (
    <aside
      className={`h-screen bg-white border-r transition-all duration-300 flex flex-col ${
        open ? "w-64" : "w-20"
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b">
        <span className="text-xl font-bold">
          {open ? "SubManager" : "$"}
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-100"
          >
            <span>{item.icon}</span>
            {open && <span className="text-sm">{item.label}</span>}
          </div>
        ))}
      </nav>

      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="m-3 p-2 border rounded text-sm hover:bg-gray-100"
      >
        {open ? "Fechar" : "Abrir"}
      </button>
    </aside>
  );
}
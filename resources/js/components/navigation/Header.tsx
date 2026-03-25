import { usePage } from "@inertiajs/react";

export default function Header() {
    const { auth } = usePage().props as any;
    const userName = auth?.user?.name || "Usuário";
    
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="text-lg">🔔</button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <span className="text-sm">{userName}</span>
        </div>
      </div>
    </header>
  );
}
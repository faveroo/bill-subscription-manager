import { PropsWithChildren, useState } from "react";
import Header  from "../components/navigation/Header";
import Sidebar from "../components/navigation/Sidebar";

export default function MainLayout({ children }: PropsWithChildren) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-zinc-700 overflow-hidden">
            <Sidebar
                isMobileOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0">
                <Header onOpenSidebar={() => setIsMobileSidebarOpen(true)} />

                <main className="p-4 md:p-6 bg-zinc-700 overflow-y-auto flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
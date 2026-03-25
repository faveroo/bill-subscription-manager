import { PropsWithChildren } from "react";
import Header  from "../components/navigation/Header";
import Sidebar from "../components/navigation/Sidebar";

export default function MainLayout({ children }: PropsWithChildren) {
    return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6 overflow-y-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
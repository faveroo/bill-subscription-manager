import type { Subscription } from "@/types/model/subscription";

export default function SubsCard({ subscription }: { subscription: Subscription }) {
    return (
        <div className="bg-zinc-800 rounded-md p-4">
            <h2 className="text-lg font-semibold text-white">{subscription.name}</h2>
            <p className="text-sm text-gray-400">R$ {subscription.price}</p>
        </div>
    );
} 
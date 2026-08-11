import Card from "./Card"
import Money from "./Money"
import { cn } from "@/lib/utils"

const TRANSACTIONS = [
    // { name: "Creative Cloud", when: "Today, 09:42", status: "In progress", card: "2841", amount: -59.99 },
    { name: "Northwind Supply", when: "Today, 08:15", status: "Completed", card: "2841", amount: -128.4 },
    { name: "Client Payout", when: "Yesterday, 17:03", status: "Completed", card: "9286", amount: 1250.0 },
]

export default function RecentTransactions({ className }: { className?: string }) {
    return (
        <Card className={cn("flex flex-col gap-5", className)}>
            <header className="flex items-center justify-between">
                <h3 className="text-lg text-zinc-900">Featured Products</h3>
                <button type="button" className="text-sm text-zinc-500 hover:text-zinc-900">
                    View All
                </button>
            </header>

            <ul className="flex flex-col gap-3">
                {TRANSACTIONS.map((t) => (
                    <li
                        key={t.name}
                        className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-zinc-50 p-4"
                    >
                        <div className="flex items-center gap-4">
                            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-sm font-medium text-zinc-500">
                                {t.name.charAt(0)}
                            </span>
                            <div>
                                <p className="font-medium text-zinc-900">{t.name}</p>
                                <p className="text-sm text-zinc-500">{t.when}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <span
                                className={`rounded-full px-3 py-1 text-sm ${
                                    t.status === "In progress"
                                        ? "bg-amber-50 text-amber-700"
                                        : "bg-emerald-50 text-emerald-700"
                                }`}
                            >
                                {t.status}
                            </span>
                            <span className="hidden text-sm text-zinc-500 sm:inline">
                                •••• {t.card}
                            </span>
                            <span
                                className={`font-semibold ${
                                    t.amount < 0 ? "text-red-600" : "text-emerald-600"
                                }`}
                            >
                                {t.amount < 0 ? "-" : "+"}
                                <Money amount={Math.abs(t.amount)} centsClassName="opacity-70" />
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </Card>
    )
}

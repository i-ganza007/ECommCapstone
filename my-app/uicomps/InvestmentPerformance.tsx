import { ArrowUpRight } from "lucide-react"
import Card from "./Card"
import Money from "./Money"
import { cn } from "@/lib/utils"

// Small multiples: one mini column per quarter, newest highlighted.
const QUARTERS = [
    { label: "Q1", height: 38 },
    { label: "Q2", height: 62 },
    { label: "Q3", height: 84 },
    { label: "Q4", height: 55 },
]

export default function InvestmentPerformance({ className }: { className?: string }) {
    return (
        <Card className={cn("flex flex-col gap-5", className)}>
            <header className="flex items-center justify-between">
                <h3 className="text-lg text-zinc-900">Recently uploaded </h3>
                <button type="button" className="text-sm text-zinc-500 hover:text-zinc-900">
                    View All
                </button>
            </header>

            <div className="flex flex-wrap items-end justify-between gap-6">
                <p className="text-4xl font-semibold text-zinc-900">
                    <Money amount={1500} />
                </p>

                <span className="flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1.5 text-sm text-white">
                    <ArrowUpRight className="size-4" />
                    1.5%
                </span>
            </div>

            <div className="flex h-28 items-end gap-4">
                {QUARTERS.map((q, i) => (
                    <div key={q.label} className="flex flex-1 flex-col items-center gap-2">
                        <div
                            style={{ height: `${q.height}%` }}
                            className={`w-full rounded-t-lg ${
                                i === QUARTERS.length - 1 ? "bg-zinc-900" : "bg-zinc-100"
                            }`}
                        />
                        <span className="text-xs text-zinc-400">{q.label}</span>
                    </div>
                ))}
            </div>
        </Card>
    )
}

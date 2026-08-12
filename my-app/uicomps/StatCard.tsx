import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react"
import Card from "./Card"
import MoneyStatCard from "@/uicomps/MoneyStatCard"

export default function StatCard({
    label,
    icon: Icon,
    amount,
    delta,
}: {
    label: string
    icon: LucideIcon
    amount: number
    /** Positive = spending rose vs. last month. */
    delta: number
}) {
    const rose = delta >= 0
    const DeltaIcon = rose ? ArrowUpRight : ArrowDownRight

    return (
        <Card className="flex flex-col justify-between gap-6">
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg text-zinc-900">{label}</h3>
                <Icon className="size-5 shrink-0 text-zinc-400" />
            </div>

            <div className="space-y-1.5">
                <MoneyStatCard amount={amount} />
                {/* Icon + sign carry the meaning, so this never relies on colour alone. */}
                <p
                    className={`flex items-center gap-1 text-sm ${
                        rose ? "text-red-600" : "text-emerald-600"
                    }`}
                >
                    <DeltaIcon className="size-4" />
                    {Math.abs(delta).toFixed(2)}% from last month
                </p>
            </div>
        </Card>
    )
}

import Money from "./Money"

// Block-level variant used inside StatCard: a caption above the figure.
// Because this renders a <div>, its parent must not be a <p>.
export default function MoneyStatCard({
    amount,
    label = "Total Products",
    className = "text-3xl font-semibold text-zinc-900",
    centsClassName = "text-zinc-400",
}: {
    amount: number
    label?: string
    className?: string
    centsClassName?: string
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-lg text-zinc-500">{label}</span>
            <Money amount={amount} className={className} centsClassName={centsClassName} />
        </div>
    )
}

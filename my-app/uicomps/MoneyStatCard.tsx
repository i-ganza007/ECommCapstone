import Money from "./Money"

export default function MoneyStatCard({
    amount,
    label = "Total Products",
    className = "text-3xl font-semibold text-zinc-900",
    codeClassName = "text-zinc-400",
}: {
    amount: number
    label?: string
    className?: string
    codeClassName?: string
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-lg text-zinc-500">{label}</span>
            <Money amount={amount} className={className} codeClassName={codeClassName} />
        </div>
    )
}

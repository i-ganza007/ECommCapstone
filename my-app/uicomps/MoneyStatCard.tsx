// Renders "$1,842.56" with the cents de-emphasised, the way the reference does it.
export default function MoneyStatCard({
    amount,
    className = "",
    centsClassName = "text-zinc-400",
}: {
    amount: number
    className?: string
    centsClassName?: string
}) {
   

    return (
        <div className="flex flex-col gap-5">
            <span className={className}>
            {amount}
            <span className={centsClassName}></span>
           </span>
        </div>
    )
}

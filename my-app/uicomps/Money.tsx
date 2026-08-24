
export default function Money({
    amount,
    className = "",
    centsClassName = "text-zinc-400",
}: {
    amount: number
    className?: string
    centsClassName?: string
}) {
    const [dollars, cents] = amount.toFixed(2).split(".")
    const withSeparators = Number(dollars).toLocaleString("en-US")

    return (
        <span className={className}>
            ${withSeparators}
            <span className={centsClassName}>.{cents}</span>
        </span>
    )
}

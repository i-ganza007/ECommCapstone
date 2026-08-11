// Renders "$1,842.56" with the cents de-emphasised, the way the reference does it.
export default function Money({
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
            <p className="text-lg">Total Products</p>
            <span className={className}>
            {amount}
            <span className={centsClassName}></span>
           </span>
        </div>
    )
}

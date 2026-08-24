import { CURRENCY_CODE, formatAmount } from "@/lib/money"

/**
 * An amount with its currency code set quieter than the number.
 *
 * It used to dim the cents instead. The franc has no minor unit, so there are
 * no cents to dim — the code takes that role, which keeps the two-tone look the
 * dashboard cards were built around.
 */
export default function Money({
    amount,
    className = "",
    codeClassName = "text-zinc-400",
}: {
    amount: number
    className?: string
    codeClassName?: string
}) {
    return (
        <span className={className}>
            <span className={codeClassName}>{CURRENCY_CODE}</span> {formatAmount(amount)}
        </span>
    )
}

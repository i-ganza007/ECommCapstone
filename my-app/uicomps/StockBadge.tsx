import { STOCK_STATUS_LABEL, type StockStatus } from "@/data/products"
import { cn } from "@/lib/utils"

/**
 * Colour alone never carries the status — the label is always spelled out, so
 * the three states are distinguishable without seeing the difference between
 * amber and green.
 */
const TONES: Record<StockStatus, string> = {
    IN_STOCK: "border-emerald-700/30 bg-emerald-700/10 text-emerald-800",
    LOW_STOCK: "border-amber-700/30 bg-amber-600/10 text-amber-800",
    OUT_OF_STOCK: "border-brand/25 bg-brand/5 text-brand/60",
}

export default function StockBadge({
    status,
    className,
}: {
    status: StockStatus
    className?: string
}) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium",
                TONES[status],
                className,
            )}
        >
            {STOCK_STATUS_LABEL[status]}
        </span>
    )
}

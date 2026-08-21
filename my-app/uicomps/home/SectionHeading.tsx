import { cn } from "@/lib/utils"

/**
 * Small tracked label above a large lowercase serif title — the pairing the
 * reference repeats down its whole page, and the app already uses lowercase
 * serif for headings elsewhere.
 */
export const eyebrowClass = "text-[11px] uppercase tracking-[0.2em] opacity-60"

export default function SectionHeading({
    eyebrow,
    title,
    align = "center",
    size = "lg",
    className,
}: {
    eyebrow: string
    title: string
    align?: "left" | "center"
    /** lg is the full-width statement size; md suits headings inside a slab. */
    size?: "md" | "lg"
    className?: string
}) {
    return (
        <div className={cn(align === "center" && "text-center", className)}>
            <p className={eyebrowClass}>{eyebrow}</p>
            <h2
                className={cn(
                    "mt-4 font-serif leading-tight lowercase",
                    size === "lg" ? "text-5xl lg:text-7xl" : "text-4xl lg:text-6xl",
                )}
            >
                {title}
            </h2>
        </div>
    )
}

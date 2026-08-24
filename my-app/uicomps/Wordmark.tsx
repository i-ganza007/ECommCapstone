import { BRAND } from "@/data/home"
import { cn } from "@/lib/utils"

/**
 * The Maison Coral wordmark. Type only — no symbol, no container, no colour of
 * its own: it draws in `currentColor`, so it is white on the header gradient and
 * coral on paper without a second version existing.
 *
 * Three things do the work:
 *   · light Cormorant Garamond, a high-contrast old-style face whose thin
 *     strokes only survive at display sizes — which is all a logo is;
 *   · wide, even letterspacing, the oldest trick for making a short name read
 *     as considered rather than merely set;
 *   · a descriptor in tracked-out Montserrat, small enough to be read second.
 *
 * Letterspacing is applied in `em` so every part of the lockup scales together,
 * and each tracked line carries a negative right margin of the same amount —
 * tracking adds space after the final letter too, which throws centring off by
 * half a space if it is left there.
 */

type Variant = "stacked" | "inline" | "monogram"
type Size = "sm" | "md" | "lg" | "xl"

const SIZES: Record<Size, { name: string; descriptor: string; gap: string }> = {
    sm: { name: "text-[13px]", descriptor: "text-[7px]", gap: "mt-2" },
    md: { name: "text-lg", descriptor: "text-[8px]", gap: "mt-2.5" },
    lg: { name: "text-3xl lg:text-4xl", descriptor: "text-[10px]", gap: "mt-4" },
    xl: { name: "text-5xl lg:text-6xl", descriptor: "text-[11px]", gap: "mt-6" },
}

/** Tracking, and the margin that cancels its trailing half. */
const NAME_TRACKING = "tracking-[0.34em] -mr-[0.34em]"
const DESCRIPTOR_TRACKING = "tracking-[0.42em] -mr-[0.42em]"

const NAME_FACE = "font-display font-light uppercase leading-[1.05]"

export default function Wordmark({
    variant = "inline",
    size = "md",
    descriptor,
    className,
}: {
    variant?: Variant
    size?: Size
    /** Small line under the name. Omit for the bare name. */
    descriptor?: string
    className?: string
}) {
    const scale = SIZES[size]

    // The two words are the lockup's only content, so they come from the same
    // place the rest of the site gets the brand name.
    const [first, second] = BRAND.blocks

    return (
        <span className={cn("inline-block", className)}>
            {/* Letterspaced capitals are announced unevenly by some screen
                readers, so the name is also stated once, plainly. */}
            <span className="sr-only">{BRAND.name}</span>

            <span aria-hidden className="block">
                {variant === "monogram" ? (
                    <span className={cn(NAME_FACE, NAME_TRACKING, scale.name, "block")}>
                        {first[0]}
                        {second[0]}
                    </span>
                ) : variant === "stacked" ? (
                    <span className="block text-center">
                        <span className={cn(NAME_FACE, NAME_TRACKING, scale.name, "block")}>
                            {first}
                        </span>
                        <span className={cn(NAME_FACE, NAME_TRACKING, scale.name, "block")}>
                            {second}
                        </span>
                    </span>
                ) : (
                    <span className={cn(NAME_FACE, NAME_TRACKING, scale.name, "block")}>
                        {first} {second}
                    </span>
                )}

                {descriptor && (
                    <span
                        className={cn(
                            "flex items-center gap-3 whitespace-nowrap",
                            variant === "stacked" && "justify-center",
                            scale.gap,
                        )}
                    >
                        {/* Hairline rules either side, at the weight of the
                            thinnest stroke in the name above them. */}
                        <span className="h-px w-6 bg-current opacity-40" />
                        <span
                            className={cn(
                                "font-sans uppercase opacity-70",
                                DESCRIPTOR_TRACKING,
                                scale.descriptor,
                            )}
                        >
                            {descriptor}
                        </span>
                        <span className="h-px w-6 bg-current opacity-40" />
                    </span>
                )}
            </span>
        </span>
    )
}

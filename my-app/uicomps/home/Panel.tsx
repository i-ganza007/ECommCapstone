import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * The rounded slab every landing-page section sits on. Matches the panels the
 * product list and checkout already use, so the home page reads as part of the
 * same app rather than a separate template.
 */
export type PanelTone = "paper" | "brand" | "pink"

const TONES: Record<PanelTone, string> = {
    paper: "border border-hairline bg-paper text-brand",
    // The hero slab. Coral on the warm page gradient, the way the reference
    // opens on one saturated block before dropping to a light body.
    brand: "bg-brand text-paper",
    // bg-hairline is already the soft pink the reference breaks its grid with.
    pink: "bg-hairline text-brand",
}

export default function Panel({
    tone = "paper",
    className,
    children,
}: {
    tone?: PanelTone
    className?: string
    children: ReactNode
}) {
    return (
        <section className={cn("mt-8 overflow-hidden rounded-3xl", TONES[tone], className)}>
            {children}
        </section>
    )
}

import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * The rounded link used for every call to action on the page. Variants exist
 * because the same control has to sit on three different backgrounds — an
 * outline that reads on paper disappears on the coral hero.
 */
type Variant = "solid" | "outline" | "onBrand" | "onPink"

const VARIANTS: Record<Variant, string> = {
    solid: "bg-brand text-paper hover:opacity-90 focus-visible:outline-brand",
    outline: "border border-hairline hover:bg-hairline/40 focus-visible:outline-brand",
    onBrand: "bg-paper text-brand hover:bg-white focus-visible:outline-paper",
    onPink: "border border-brand/25 hover:bg-paper/60 focus-visible:outline-brand",
}

export default function PillLink({
    href,
    variant = "outline",
    className,
    children,
    ...rest
}: {
    href: ComponentProps<typeof Link>["href"]
    variant?: Variant
    className?: string
    children: ReactNode
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
    return (
        <Link
            href={href}
            className={cn(
                "inline-block rounded-full px-5 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                VARIANTS[variant],
                className,
            )}
            {...rest}
        >
            {children}
        </Link>
    )
}

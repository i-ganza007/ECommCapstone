"use client"

import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import * as React from "react"

import { selectCartCount, useCartStore } from "@/store/store"
import { useCartHydrated } from "@/store/useCartHydrated"

/**
 * Floating bag count, pinned bottom-right, linking through to checkout. Hidden
 * while the cart is empty and pops into view on the first add.
 *
 * It sits above the product drawer on purpose — "add to bag" is pressed from
 * inside that panel, and feedback the panel covers up is no feedback at all.
 * The wrapper only covers the button itself, so the rest of the panel stays
 * clickable underneath.
 */
export default function CartIndicator() {
    const hydrated = useCartHydrated()
    const storedCount = useCartStore(selectCartCount)

    // Until the persisted cart has loaded, show what the server showed.
    const count = hydrated ? storedCount : 0

    const [bump, setBump] = React.useState(false)
    const previousCount = React.useRef(count)

    React.useEffect(() => {
        const grew = count > previousCount.current
        previousCount.current = count

        // Only additions pop. Removing an item shrinking the badge would be a
        // celebratory animation for the wrong event.
        if (!grew) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        setBump(true)
        const timer = window.setTimeout(() => setBump(false), 180)
        return () => window.clearTimeout(timer)
    }, [count])

    const presence =
        count === 0 ? "scale-75 opacity-0" : bump ? "scale-110 opacity-100" : "scale-100 opacity-100"

    const bagSummary = count === 1 ? "1 item in your bag" : `${count} items in your bag`

    return (
        // While empty it is only transparent, not unmounted, so it still animates
        // in. inert is what stops an invisible control from swallowing clicks and
        // sitting in the tab order.
        <div
            inert={count === 0}
            className={`fixed right-6 bottom-6 z-50 transition-[opacity,scale] duration-200 ease-out ${presence}`}
        >
            <Link
                href="/checkout"
                aria-label={`Go to checkout — ${bagSummary}`}
                className="relative grid size-14 place-items-center rounded-full bg-brand text-paper shadow-lg shadow-black/30 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
            >
                <ShoppingBag className="size-6" aria-hidden />

                {/* ring-2 in the button's own colour keeps the badge legible where it
                    overhangs the circle onto whatever is behind it. */}
                <span
                    className="absolute -top-1 -right-1 grid h-6 min-w-6 place-items-center rounded-full bg-paper px-1.5 text-xs font-semibold text-brand ring-2 ring-brand"
                    aria-hidden
                >
                    {count > 99 ? "99+" : count}
                </span>
            </Link>

            {/* Kept off the link: a live region wrapping it would re-announce the
                link's whole accessible name on every count change. */}
            <span role="status" aria-live="polite" className="sr-only">
                {bagSummary}
            </span>
        </div>
    )
}

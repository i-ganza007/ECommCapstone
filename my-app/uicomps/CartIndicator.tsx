"use client"

import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import * as React from "react"

import { selectCartCount, useCartStore } from "@/store/store"
import { useCartHydrated } from "@/store/useCartHydrated"


export default function CartIndicator() {
    const hydrated = useCartHydrated()
    const storedCount = useCartStore(selectCartCount)

    const count = hydrated ? storedCount : 0

    const [bump, setBump] = React.useState(false)
    const previousCount = React.useRef(count)

    React.useEffect(() => {
        const grew = count > previousCount.current
        previousCount.current = count

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

             
                <span
                    className="absolute -top-1 -right-1 grid h-6 min-w-6 place-items-center rounded-full bg-paper px-1.5 text-xs font-semibold text-brand ring-2 ring-brand"
                    aria-hidden
                >
                    {count > 99 ? "99+" : count}
                </span>
            </Link>

          
            <span role="status" aria-live="polite" className="sr-only">
                {bagSummary}
            </span>
        </div>
    )
}

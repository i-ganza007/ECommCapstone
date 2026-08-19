"use client"

import * as React from "react"

import { useCartStore } from "@/store/store"

/**
 * Loads the persisted cart once, after mount, and reports whether that has
 * happened yet. The store is created with `skipHydration`, so nothing reads
 * localStorage until this runs — which is what keeps the first client render
 * identical to the server's.
 *
 * Anything that would render a different number for an empty vs. restored cart
 * (a badge, a subtotal, a line count) should hold its pre-hydration value until
 * this returns true, or React will report a hydration mismatch.
 */
export function useCartHydrated(): boolean {
    const [hydrated, setHydrated] = React.useState(false)

    React.useEffect(() => {
        // Fires for a rehydrate that finishes after this subscription is set up.
        const unsubscribe = useCartStore.persist.onFinishHydration(() => setHydrated(true))

        void useCartStore.persist.rehydrate()

        // localStorage is synchronous, so rehydrate() above may already have
        // finished before onFinishHydration was ever called. Ask directly.
        if (useCartStore.persist.hasHydrated()) setHydrated(true)

        return unsubscribe
    }, [])

    return hydrated
}

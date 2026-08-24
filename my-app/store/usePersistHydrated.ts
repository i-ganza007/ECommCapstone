"use client"

import * as React from "react"

/** The slice of zustand's persist API this hook needs. */
type PersistedStore = {
    persist: {
        onFinishHydration: (listener: () => void) => () => void
        rehydrate: () => Promise<void> | void
        hasHydrated: () => boolean
    }
}

/**
 * Loads a persisted store once, after mount, and reports whether that has
 * happened. Both stores are created with `skipHydration`, so nothing reads
 * localStorage until this runs — which is what keeps the first client render
 * identical to the server's.
 *
 * Anything that would render differently for an empty vs. restored store (a cart
 * badge, a subtotal, a signed-in state) must hold its pre-hydration value until
 * this returns true, or React reports a hydration mismatch.
 */
export function usePersistHydrated(store: PersistedStore): boolean {
    const [hydrated, setHydrated] = React.useState(false)

    React.useEffect(() => {
        // Fires for a rehydrate that finishes after this subscription is set up.
        const unsubscribe = store.persist.onFinishHydration(() => setHydrated(true))

        void store.persist.rehydrate()

        // localStorage is synchronous, so rehydrate() may already have finished
        // before onFinishHydration was ever called. Ask directly.
        if (store.persist.hasHydrated()) setHydrated(true)

        return unsubscribe
    }, [store])

    return hydrated
}

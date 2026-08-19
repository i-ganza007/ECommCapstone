"use client"

import * as React from "react"

import { useCartStore } from "@/store/store"


export function useCartHydrated(): boolean {
    const [hydrated, setHydrated] = React.useState(false)

    React.useEffect(() => {
        const unsubscribe = useCartStore.persist.onFinishHydration(() => setHydrated(true))

        void useCartStore.persist.rehydrate()

        if (useCartStore.persist.hasHydrated()) setHydrated(true)

        return unsubscribe
    }, [])

    return hydrated
}

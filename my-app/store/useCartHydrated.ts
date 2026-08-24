"use client"

import { useCartStore } from "@/store/store"
import { usePersistHydrated } from "@/store/usePersistHydrated"

/** True once the persisted cart has been read from localStorage. */
export function useCartHydrated(): boolean {
    return usePersistHydrated(useCartStore)
}

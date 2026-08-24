"use client"

import { useCatalogStore } from "@/store/catalog"
import { usePersistHydrated } from "@/store/usePersistHydrated"

/** True once products created on this device have been read from localStorage. */
export function useCatalogHydrated(): boolean {
    return usePersistHydrated(useCatalogStore)
}

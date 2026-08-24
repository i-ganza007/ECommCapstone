"use client"

import { useSessionStore } from "@/store/session"
import { usePersistHydrated } from "@/store/usePersistHydrated"

/** True once the persisted session has been read from localStorage. */
export function useSessionHydrated(): boolean {
    return usePersistHydrated(useSessionStore)
}

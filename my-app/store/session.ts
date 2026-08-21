import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

/**
 * ⚠️ NOT AUTHENTICATION.
 *
 * This project has no backend — no API routes, no database, no cookies. This
 * store only remembers, in localStorage, that someone typed an email into the
 * sign-in form, so the UI has something to mean by "logged in". Anyone can set
 * the key by hand and appear signed in.
 *
 * It exists to drive presentation (enabling the Buy control), and nothing that
 * matters may be gated on it. Real sign-in needs a server session or token
 * verified on every request, at which point this file should be deleted rather
 * than extended.
 */
interface SessionState {
    email: string | null
    signIn: (email: string) => void
    signOut: () => void
}

// persist writes on every change, and there is no localStorage off the browser.
const noopStorage: Storage = {
    length: 0,
    clear: () => {},
    getItem: () => null,
    key: () => null,
    removeItem: () => {},
    setItem: () => {},
}

export const useSessionStore = create<SessionState>()(
    persist(
        (set) => ({
            email: null,
            signIn: (email) => set({ email: email.trim() || null }),
            signOut: () => set({ email: null }),
        }),
        {
            name: "session",
            storage: createJSONStorage(() =>
                typeof window === "undefined" ? noopStorage : window.localStorage,
            ),
            partialize: (state) => ({ email: state.email }),
            // Same reason as the cart: rehydrating during creation would make the
            // first client render disagree with the server's.
            skipHydration: true,
        },
    ),
)

export const selectIsSignedIn = (state: SessionState) => state.email !== null

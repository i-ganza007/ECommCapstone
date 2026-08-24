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
/**
 * What the sign-up form collected. There is no password field here and there
 * never should be — nothing in this project is entitled to keep one.
 */
export interface Profile {
    firstName: string
    lastName: string
    email: string
    /** `YYYY-MM-DD`. Stored as the date, not the age, so it stays true. */
    dob: string
}

interface SessionState {
    email: string | null
    /** Only set by signing up on this device; signing in cannot recover it. */
    profile: Profile | null
    signIn: (email: string) => void
    signUp: (profile: Profile) => void
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
            profile: null,

            // Signing in knows nothing but the address that was typed. It leaves
            // any profile from a previous sign-up on this device alone unless the
            // address has changed, in which case that profile is not this person's.
            signIn: (email) =>
                set((state) => {
                    const next = email.trim() || null
                    return {
                        email: next,
                        profile: state.profile?.email === next ? state.profile : null,
                    }
                }),

            signUp: (profile) =>
                set({ email: profile.email.trim() || null, profile }),

            signOut: () => set({ email: null, profile: null }),
        }),
        {
            name: "session",
            storage: createJSONStorage(() =>
                typeof window === "undefined" ? noopStorage : window.localStorage,
            ),
            partialize: (state) => ({ email: state.email, profile: state.profile }),
            // Same reason as the cart: rehydrating during creation would make the
            // first client render disagree with the server's.
            skipHydration: true,
        },
    ),
)

export const selectIsSignedIn = (state: SessionState) => state.email !== null

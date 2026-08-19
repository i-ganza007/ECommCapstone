import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { Product } from "@/uicomps/ProductCard"

/**
 * A cart line is just a product carrying how many of it were added, so anything
 * that renders a Product — ProductCard, the detail panel — can take one as-is.
 */
export interface CartItem extends Product {
    quantity: number
}

/**
 * Products in the list have no id field, and `sku` is optional on the type even
 * though every current product sets one. Name is the fallback because the grid
 * already keys off it, so it is unique in practice.
 */
export const cartItemId = (product: Product): string => product.sku ?? product.name

interface CartState {
    items: CartItem[]
    /** Adds `quantity` more, or merges into the existing line. Clamped to stock. */
    addToCart: (product: Product, quantity?: number) => void
    removeFromCart: (id: string) => void
    /** Sets an absolute quantity. Dropping to 0 or below removes the line. */
    setQuantity: (id: string, quantity: number) => void
    clearCart: () => void
}

// `stock: 0` means sold out, but `stock: undefined` means "not tracked" rather
// than "none left" — an untracked product must stay addable.
const capacityOf = (product: Product) =>
    product.stock === undefined ? Number.POSITIVE_INFINITY : product.stock

// persist writes on every state change, not just on hydrate, so a mutation from
// a non-browser context would call setItem on nothing. Swallow those instead of
// throwing — there is no session to remember there anyway.
const noopStorage: Storage = {
    length: 0,
    clear: () => {},
    getItem: () => null,
    key: () => null,
    removeItem: () => {},
    setItem: () => {},
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],

            addToCart: (product, quantity = 1) =>
                set((state) => {
                    const capacity = capacityOf(product)
                    if (quantity <= 0 || capacity === 0) return state

                    const id = cartItemId(product)
                    const existing = state.items.find((item) => cartItemId(item) === id)

                    if (!existing) {
                        return {
                            items: [
                                ...state.items,
                                { ...product, quantity: Math.min(quantity, capacity) },
                            ],
                        }
                    }

                    const next = Math.min(existing.quantity + quantity, capacity)
                    // Already at the stock ceiling — return the same state object so
                    // subscribers do not re-render on a no-op.
                    if (next === existing.quantity) return state

                    return {
                        items: state.items.map((item) =>
                            cartItemId(item) === id ? { ...item, quantity: next } : item,
                        ),
                    }
                }),

            removeFromCart: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => cartItemId(item) !== id),
                })),

            setQuantity: (id, quantity) =>
                set((state) => {
                    if (quantity <= 0) {
                        return { items: state.items.filter((item) => cartItemId(item) !== id) }
                    }
                    return {
                        items: state.items.map((item) =>
                            cartItemId(item) === id
                                ? { ...item, quantity: Math.min(quantity, capacityOf(item)) }
                                : item,
                        ),
                    }
                }),

            clearCart: () => set({ items: [] }),
        }),
        {
            name: "cart",
            storage: createJSONStorage(() =>
                typeof window === "undefined" ? noopStorage : window.localStorage,
            ),
            // Only the lines are worth persisting; the actions are rebuilt on load.
            partialize: (state) => ({ items: state.items }),
            // The server has no localStorage, so rehydrating during creation would
            // make the first client render disagree with the SSR'd markup. Deferred
            // to an effect instead — see useCartHydrated below.
            skipHydration: true,
        },
    ),
)

/** Total units in the cart, not the number of distinct lines. */
export const selectCartCount = (state: CartState) =>
    state.items.reduce((total, item) => total + item.quantity, 0)

export const selectCartSubtotal = (state: CartState) =>
    state.items.reduce((total, item) => total + item.price * item.quantity, 0)

export const selectIsInCart = (product: Product) => (state: CartState) =>
    state.items.some((item) => cartItemId(item) === cartItemId(product))

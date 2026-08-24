import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { Product } from "@/uicomps/ProductCard"

export interface CartItem extends Product {
    quantity: number
}

export const cartItemId = (product: Product): string => product.sku ?? product.name

interface CartState {
    items: CartItem[]
    addToCart: (product: Product, quantity?: number) => void
    removeFromCart: (id: string) => void
    setQuantity: (id: string, quantity: number) => void
    clearCart: () => void
}


const capacityOf = (product: Product) =>
    product.stock === undefined ? Number.POSITIVE_INFINITY : product.stock

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
            partialize: (state) => ({ items: state.items }),
         
            skipHydration: true,
        },
    ),
)

export const selectCartCount = (state: CartState) =>
    state.items.reduce((total, item) => total + item.quantity, 0)

export const selectCartSubtotal = (state: CartState) =>
    state.items.reduce((total, item) => total + item.price * item.quantity, 0)

export const selectIsInCart = (product: Product) => (state: CartState) =>
    state.items.some((item) => cartItemId(item) === cartItemId(product))

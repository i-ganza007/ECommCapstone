import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { CATALOG, type CatalogProduct } from "@/data/products"

/**
 * ⚠️ Products added on this device only.
 *
 * There is no backend, so a product created in the form is written to
 * localStorage and merged into the catalogue in the browser that made it.
 * Nobody else will ever see it, and clearing site data loses it. The moment
 * there is an API this store should be deleted rather than extended.
 */
interface CatalogState {
    created: CatalogProduct[]
    addProduct: (product: CatalogProduct) => void
    removeProduct: (sku: string) => void
}

const noopStorage: Storage = {
    length: 0,
    clear: () => {},
    getItem: () => null,
    key: () => null,
    removeItem: () => {},
    setItem: () => {},
}

export const useCatalogStore = create<CatalogState>()(
    persist(
        (set) => ({
            created: [],

            addProduct: (product) =>
                set((state) => ({
                    // Newest first: someone who just added a product should not
                    // have to hunt for it at the bottom of the grid.
                    created: [product, ...state.created],
                })),

            removeProduct: (sku) =>
                set((state) => ({
                    created: state.created.filter((product) => product.sku !== sku),
                })),
        }),
        {
            name: "created-products",
            storage: createJSONStorage(() =>
                typeof window === "undefined" ? noopStorage : window.localStorage,
            ),
            partialize: (state) => ({ created: state.created }),
            // Same reason as the cart and the session: rehydrating during creation
            // would make the first client render disagree with the server's.
            skipHydration: true,
        },
    ),
)

/**
 * Every base SKU currently in use, shipped or created. The create form checks
 * against this — a duplicate SKU would make `findProduct` ambiguous and put two
 * different products behind one detail URL.
 */
export function usedSkus(created: CatalogProduct[]): Set<string> {
    return new Set([
        ...CATALOG.map((product) => product.sku!),
        ...created.map((product) => product.sku!),
    ])
}

/** Looks in the created products only — the shipped ones have `findProduct`. */
export const selectCreatedProduct =
    (sku: string) =>
    (state: CatalogState): CatalogProduct | undefined =>
        state.created.find((product) => product.sku === sku)

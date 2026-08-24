"use client"

import Link from "next/link"

import { selectCreatedProduct, useCatalogStore } from "@/store/catalog"
import { useCatalogHydrated } from "@/store/useCatalogHydrated"
import ProductDetailView from "@/uicomps/ProductDetailView"

/**
 * The detail page for a SKU the server does not know.
 *
 * Products created in the browser live in localStorage, so a request for one
 * reaches the server as an unknown SKU. Rather than 404 on something that does
 * exist for this visitor, the route falls through to this component, which
 * looks in the created products once they have loaded.
 */
export default function DraftProductDetail({ sku }: { sku: string }) {
    const hydrated = useCatalogHydrated()
    const product = useCatalogStore(selectCreatedProduct(sku))

    // Before the store has loaded, every SKU looks unknown. Saying so would put
    // "no such product" in front of someone whose product is about to appear.
    if (!hydrated) {
        return (
            <main className="mt-8 rounded-3xl border border-hairline bg-paper px-8 py-20 text-center text-brand">
                <p className="text-sm text-brand/60">Looking for this product…</p>
            </main>
        )
    }

    if (!product) {
        return (
            <main className="mt-8 rounded-3xl border border-hairline bg-paper px-8 py-20 text-center text-brand">
                <h1 className="font-serif text-3xl lowercase">no such product</h1>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-brand/70">
                    Nothing in the catalogue has the SKU{" "}
                    <span className="font-mono">{sku}</span>. If you created it in a
                    different browser, it only exists there.
                </p>
                <Link
                    href="/productList"
                    className="mt-8 inline-block rounded-full bg-brand px-6 py-2.5 text-sm text-paper transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                    Browse products
                </Link>
            </main>
        )
    }

    return <ProductDetailView product={product} />
}

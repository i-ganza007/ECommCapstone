"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import * as React from "react"

import {
    activeVariants,
    stockStatus,
    variantAsCartLine,
    type CatalogProduct,
} from "@/data/products"
import { money } from "@/lib/money"
import { cn } from "@/lib/utils"
import { selectIsSignedIn, useSessionStore } from "@/store/session"
import { useCartStore } from "@/store/store"
import { useSessionHydrated } from "@/store/useSessionHydrated"
import StockBadge from "@/uicomps/StockBadge"

/**
 * Variant picker and Buy control for the product detail page.
 *
 * Two independent reasons the Buy button can be unavailable — sold out, and not
 * signed in — so the disabled state always comes with the reason spelled out
 * underneath rather than leaving a dead control with no explanation.
 */
export default function VariantPurchase({ product }: { product: CatalogProduct }) {
    const router = useRouter()
    const addToCart = useCartStore((state) => state.addToCart)

    const sessionReady = useSessionHydrated()
    const signedIn = useSessionStore(selectIsSignedIn)

    // Inactive variants are filtered out here, once, so nothing below can offer
    // a discontinued size by accident.
    const variants = React.useMemo(() => activeVariants(product), [product])

    // Open on the first variant someone can actually buy; only fall back to a
    // sold-out one when every variant is sold out.
    const [selectedSku, setSelectedSku] = React.useState(
        () =>
            variants.find((variant) => variant.stock > 0)?.sku ?? variants[0]?.sku ?? null,
    )

    const selected = variants.find((variant) => variant.sku === selectedSku) ?? null
    const soldOut = selected !== null && selected.stock <= 0

    // Before the session has loaded, treat everyone as signed out: that matches
    // what the server rendered, so the button does not flip after hydration.
    const canBuy = sessionReady && signedIn && selected !== null && !soldOut

    function handleBuy() {
        if (!canBuy || !selected) return
        addToCart(variantAsCartLine(product, selected))
        router.push("/checkout")
    }

    if (variants.length === 0) {
        return (
            <p className="mt-8 text-sm text-brand/60">
                This product has no variants available right now.
            </p>
        )
    }

    return (
        <div className="mt-10">
            <fieldset>
                <legend className="text-[11px] uppercase tracking-[0.2em] text-brand/60">
                    Choose a size
                </legend>

                <div className="mt-4 space-y-2">
                    {variants.map((variant) => {
                        const status = stockStatus(variant.stock)
                        const unavailable = status === "OUT_OF_STOCK"
                        const isSelected = variant.sku === selectedSku

                        return (
                            <label
                                key={variant.sku}
                                className={cn(
                                    "flex cursor-pointer items-center gap-4 rounded-2xl border px-4 py-3.5 transition-colors",
                                    isSelected
                                        ? "border-brand bg-brand/5"
                                        : "border-hairline hover:bg-hairline/25",
                                    // Sold-out rows stay visible and legible — the
                                    // spec asks for their status to be shown — but
                                    // cannot be picked.
                                    unavailable && "cursor-not-allowed opacity-60 hover:bg-transparent",
                                )}
                            >
                                <input
                                    type="radio"
                                    name="variant"
                                    value={variant.sku}
                                    checked={isSelected}
                                    disabled={unavailable}
                                    onChange={() => setSelectedSku(variant.sku)}
                                    className="size-4 shrink-0 accent-brand"
                                />

                                <span className="flex-1 text-sm">{variant.label}</span>

                                <span className="font-serif text-base italic">
                                    {money(variant.price)}
                                </span>

                                <StockBadge status={status} className="w-24 justify-center" />
                            </label>
                        )
                    })}
                </div>
            </fieldset>

            <button
                type="button"
                onClick={handleBuy}
                disabled={!canBuy}
                className="mt-6 w-full rounded-full bg-brand px-6 py-3.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40"
            >
                {soldOut ? "Out of stock" : "Buy now"}
            </button>

            {/* Only after the session has loaded, or this flashes at signed-in
                people on every page load. */}
            {sessionReady && !signedIn && (
                <p className="mt-3 text-center text-sm text-brand/70">
                    <Link
                        href="/login"
                        className="font-medium underline underline-offset-4 hover:opacity-70"
                    >
                        Log in
                    </Link>{" "}
                    to buy this product.
                </p>
            )}

            {sessionReady && signedIn && soldOut && (
                <p className="mt-3 text-center text-sm text-brand/70">
                    Pick another size — this one is out of stock.
                </p>
            )}
        </div>
    )
}

"use client"

import { Minus, Plus, X } from "lucide-react"
import Link from "next/link"

import {
    cartItemId,
    selectCartCount,
    selectCartSubtotal,
    useCartStore,
    type CartItem,
} from "@/store/store"
import { useCartHydrated } from "@/store/useCartHydrated"
import { ProductImage } from "@/uicomps/ProductCard"

const money = (amount: number) => `$${amount.toFixed(2)} eur`

export default function CheckoutPage() {
    const hydrated = useCartHydrated()
    const items = useCartStore((state) => state.items)
    const count = useCartStore(selectCartCount)
    const subtotal = useCartStore(selectCartSubtotal)
    const clearCart = useCartStore((state) => state.clearCart)

    return (
        <main className="mt-8 overflow-hidden rounded-3xl border border-hairline bg-paper text-brand">
            <header className="flex items-baseline justify-between gap-4 border-b border-hairline px-8 py-6">
                <h1 className="font-serif text-3xl lowercase">checkout</h1>
                {hydrated && count > 0 && (
                    <p className="text-sm text-brand/70">
                        {count === 1 ? "1 item" : `${count} items`}
                    </p>
                )}
            </header>

            {/* The cart lives in localStorage, so the server cannot know what is in
                it. Rendering the empty state before hydration would flash "your bag
                is empty" at someone who has a full bag. */}
            {!hydrated ? (
                <p className="px-8 py-16 text-center text-sm text-brand/60">Loading your bag…</p>
            ) : items.length === 0 ? (
                <EmptyBag />
            ) : (
                <>
                    <ul className="grid gap-px bg-hairline">
                        {items.map((item) => (
                            <CheckoutLine key={cartItemId(item)} item={item} />
                        ))}
                    </ul>

                    <section className="flex flex-col items-end gap-4 border-t border-hairline px-8 py-6">
                        <div className="flex w-full max-w-xs items-baseline justify-between gap-4">
                            <span className="text-sm text-brand/70">Subtotal</span>
                            <span className="font-serif text-2xl">{money(subtotal)}</span>
                        </div>
                        <p className="text-xs text-brand/60">
                            Shipping and taxes are calculated at payment.
                        </p>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={clearCart}
                                className="rounded-full border border-hairline px-5 py-2.5 text-sm transition-colors hover:bg-hairline/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                            >
                                Clear bag
                            </button>
                            <button
                                type="button"
                                className="rounded-full bg-brand px-6 py-2.5 text-sm text-paper transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                            >
                                Place order
                            </button>
                        </div>
                    </section>
                </>
            )}
        </main>
    )
}

function EmptyBag() {
    return (
        <div className="flex flex-col items-center gap-4 px-8 py-20 text-center">
            <p className="font-serif text-xl italic">your bag is empty</p>
            <Link
                href="/productList"
                className="rounded-full bg-brand px-6 py-2.5 text-sm text-paper transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
                Browse products
            </Link>
        </div>
    )
}

function CheckoutLine({ item }: { item: CartItem }) {
    const setQuantity = useCartStore((state) => state.setQuantity)
    const removeFromCart = useCartStore((state) => state.removeFromCart)

    const id = cartItemId(item)
    const atStockLimit = item.stock !== undefined && item.quantity >= item.stock

    return (
        <li className="flex items-center gap-5 bg-paper px-8 py-5">
            <div className="relative grid size-20 shrink-0 place-items-center rounded-xl bg-hairline/20">
                <ProductImage name={item.name} image={item.image} sizes="5rem" />
            </div>

            <div className="min-w-0 flex-1">
                <h2 className="font-serif text-lg lowercase">{item.name}</h2>
                <p className="mt-0.5 text-xs text-brand/60">
                    {[item.size, item.sku].filter(Boolean).join(" · ") || "—"}
                </p>
                <p className="mt-1 font-serif text-sm italic">{money(item.price)} each</p>
            </div>

            <div className="flex items-center gap-1 rounded-full border border-hairline p-1">
                <StepperButton
                    label={`Decrease quantity of ${item.name}`}
                    onClick={() => setQuantity(id, item.quantity - 1)}
                >
                    <Minus className="size-3.5" />
                </StepperButton>

                <span className="min-w-8 text-center text-sm tabular-nums" aria-live="polite">
                    {item.quantity}
                </span>

                <StepperButton
                    label={`Increase quantity of ${item.name}`}
                    disabled={atStockLimit}
                    onClick={() => setQuantity(id, item.quantity + 1)}
                >
                    <Plus className="size-3.5" />
                </StepperButton>
            </div>

            <p className="w-28 shrink-0 text-right font-serif text-lg">
                {money(item.price * item.quantity)}
            </p>

            <button
                type="button"
                onClick={() => removeFromCart(id)}
                aria-label={`Remove ${item.name} from your bag`}
                className="grid size-9 shrink-0 place-items-center rounded-full border border-hairline transition-colors hover:bg-hairline/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
                <X className="size-4" />
            </button>
        </li>
    )
}

function StepperButton({
    label,
    onClick,
    disabled,
    children,
}: {
    label: string
    onClick: () => void
    disabled?: boolean
    children: React.ReactNode
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            className="grid size-7 place-items-center rounded-full transition-colors hover:bg-hairline/50 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand disabled:opacity-30 disabled:hover:bg-transparent"
        >
            {children}
        </button>
    )
}

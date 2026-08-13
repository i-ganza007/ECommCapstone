"use client"

import { Drawer } from "@base-ui/react/drawer"
import { Beaker, Droplets, Leaf, Package, Ruler, ShoppingBag, Tag, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { ProductImage, Rating, type Product } from "@/uicomps/ProductCard"
import { productDrawer } from "@/uicomps/productDrawer"

/**
 * The detail panel for the product grid. Mounted once per page; every card is a
 * detached trigger that hands its product over as the payload (see productDrawer).
 * Slides in from the right, and can be swiped away on touch.
 */
export default function ProductDetailPanel() {
    return (
        <Drawer.Root handle={productDrawer} swipeDirection="right">
            {({ payload: product }) => (
                <Drawer.Portal>
                    <Drawer.Backdrop className={backdropClassName} />

                    <Drawer.Viewport className="fixed inset-0 flex items-stretch justify-end">
                        <Drawer.Popup className={popupClassName}>
                            {product && <PanelBody product={product} />}
                        </Drawer.Popup>
                    </Drawer.Viewport>
                </Drawer.Portal>
            )}
        </Drawer.Root>
    )
}

function PanelBody({ product }: { product: Product }) {
    const { name, price, rating, reviews, isNew, image, description, size, sku } = product
    const inStock = product.stock === undefined || product.stock > 0

    return (
        <Drawer.Content className="text-brand">
            {/* Stays put while the rest scrolls, so closing is always one click away. */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-hairline bg-paper px-6 py-4">
                <Drawer.Close
                    aria-label="Close product details"
                    className="grid size-9 place-items-center rounded-full border border-hairline transition-colors hover:bg-hairline/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                    <X className="size-4" />
                </Drawer.Close>

                <button
                    type="button"
                    disabled={!inStock}
                    className="flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm text-paper transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-40"
                >
                    <ShoppingBag className="size-4" />
                    {inStock ? "Add to bag" : "Sold out"}
                </button>
            </div>

            <div className="border-b border-hairline">
                <div className="relative grid h-64 w-full place-items-center bg-hairline/20">
                    <ProductImage name={name} image={image} sizes="(max-width: 480px) 100vw, 28rem" />
                </div>
            </div>

            <div className="border-b border-hairline px-6 py-6">
                <p className="h-5 font-serif text-xs italic">{isNew ? "new arrival" : ""}</p>
                <Drawer.Title className="font-serif text-3xl lowercase">{name}</Drawer.Title>

                <div className="mt-3 flex items-center justify-between gap-4">
                    <p className="font-serif text-lg italic">${price.toFixed(2)} eur</p>
                    <span className="flex items-center gap-2 text-xs">
                        <Rating rating={rating} />
                        <span>
                            <span className="sr-only">{rating} out of 5 stars, </span>
                            {reviews} reviews
                        </span>
                    </span>
                </div>
            </div>

            {/* Same trick as the product grid: hairlines are the ruled background
                showing through the gaps between cells. */}
            <section className="border-b border-hairline px-6 py-6">
                <h3 className="mb-4 text-sm">Overview</h3>
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-hairline">
                    <Stat label="Rating" value={`${rating}/5`} />
                    <Stat label="Reviews" value={String(reviews)} />
                    <Stat label="Size" value={size ?? "—"} />
                    <Stat
                        label="Stock"
                        value={product.stock === undefined ? "—" : String(product.stock)}
                    />
                </dl>
            </section>

            {description && (
                <section className="border-b border-hairline px-6 py-6">
                    <h3 className="mb-3 text-sm">Details</h3>
                    <Drawer.Description className="text-sm leading-relaxed text-brand/80">
                        {description}
                    </Drawer.Description>
                </section>
            )}

            <section className="px-6 py-6">
                <h3 className="mb-2 text-sm">Product Info</h3>
                <dl>
                    <InfoRow icon={Tag} label="SKU" value={sku} />
                    <InfoRow icon={Ruler} label="Size" value={size} />
                    <InfoRow icon={Droplets} label="Texture" value={product.texture} />
                    <InfoRow icon={Leaf} label="Skin type" value={product.skinType} />
                    <InfoRow icon={Beaker} label="Key ingredient" value={product.keyIngredient} />
                    <InfoRow
                        icon={Package}
                        label="Availability"
                        value={inStock ? "In stock" : "Sold out"}
                    />
                </dl>
            </section>
        </Drawer.Content>
    )
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-paper px-4 py-3">
            <dt className="text-xs text-brand/70">{label}</dt>
            <dd className="mt-1 font-serif text-2xl">{value}</dd>
        </div>
    )
}

function InfoRow({
    icon: Icon,
    label,
    value,
}: {
    icon: LucideIcon
    label: string
    value?: string
}) {
    if (!value) return null

    return (
        <div className="flex items-center justify-between gap-4 border-b border-hairline/60 py-3 text-sm last:border-b-0">
            <dt className="flex items-center gap-2.5 text-brand/70">
                <Icon className="size-4 shrink-0" />
                {label}
            </dt>
            <dd className="text-right">{value}</dd>
        </div>
    )
}

const backdropClassName =
    "fixed inset-0 min-h-dvh bg-black opacity-[calc(0.35*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-starting-style:opacity-0 data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]"

// --bleed keeps an extra slab of panel past the right edge, so an overshooting
// swipe never tears open a gap between the panel and the edge of the screen.
const popupClassName =
    "[--bleed:3rem] -mr-[3rem] h-full w-[calc(28rem+3rem)] max-w-[calc(100vw-2rem+3rem)] overflow-y-auto overscroll-contain border-l border-hairline bg-paper pr-[3rem] shadow-[-0.5rem_0_2rem] shadow-black/10 outline-none touch-auto [transform:translateX(var(--drawer-swipe-movement-x))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none data-starting-style:[transform:translateX(calc(100%-var(--bleed)+2px))] data-ending-style:[transform:translateX(calc(100%-var(--bleed)+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]"

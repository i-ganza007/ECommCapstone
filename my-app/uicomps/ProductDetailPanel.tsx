"use client"

import { Drawer } from "@base-ui/react/drawer"
import { Tabs } from "@base-ui/react/tabs"
import { Beaker, Droplets, Leaf, Package, Ruler, ShoppingBag, Tag, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

import { useCartStore } from "@/store/store"
import { ProductImage, Rating, type Product } from "@/uicomps/ProductCard"
import { productDrawer } from "@/uicomps/productDrawer"

/**
 * The detail panel for the product grid. Mounted once per page; every card is a
 * detached trigger that hands its product over as the payload (see productDrawer).
 * Slides in from the right, and can be swiped away on touch.
 *
 * The content is split across tabs rather than stacked into one long column, so
 * that on a normal screen no part of the panel has to be scrolled to be read.
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

    // Subscribing to the action alone, not to items — this panel never renders
    // the cart, so it should not re-render when the cart changes.
    const addToCart = useCartStore((state) => state.addToCart)

    return (
        // min-h-0 lets the tab area, not the panel, absorb the leftover height.
        <Drawer.Content className="flex h-full min-h-0 flex-col text-brand">
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-hairline px-6 py-4">
                <Drawer.Close
                    aria-label="Close product details"
                    className="grid size-9 place-items-center rounded-full border border-hairline transition-colors hover:bg-hairline/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                    <X className="size-4" />
                </Drawer.Close>

                <button
                    type="button"
                    disabled={!inStock}
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm text-paper transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-40"
                >
                    <ShoppingBag className="size-4" />
                    {inStock ? "Add to bag" : "Sold out"}
                </button>
            </div>

            {/* Identity sits above the tabs, so the panel's title and price stay put
                no matter which tab is open — and Drawer.Title always labels the dialog. */}
            <div className="shrink-0 border-b border-hairline px-6 py-5">
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

            <Tabs.Root defaultValue="overview" className="flex min-h-0 flex-1 flex-col">
                <Tabs.List className="relative flex shrink-0 border-b border-hairline px-6">
                    <PanelTab value="overview">Overview</PanelTab>
                    <PanelTab value="details">Details</PanelTab>
                    <PanelTab value="specs">Specs</PanelTab>

                    <Tabs.Indicator className="absolute bottom-0 left-0 h-px w-(--active-tab-width) translate-x-(--active-tab-left) bg-brand transition-[translate,width] duration-200 ease-out" />
                </Tabs.List>

                {/* Each panel is sized to fit; overflow-y-auto is only a safety valve for
                    very short viewports. Base UI gives the active panel tabIndex=0, so it
                    stays keyboard-scrollable if that ever kicks in. */}
                <Tabs.Panel value="overview" className={tabPanelClassName}>
                    <div className="relative grid h-48 w-full place-items-center rounded-xl bg-hairline/20">
                        <ProductImage
                            name={name}
                            image={image}
                            sizes="(max-width: 480px) 100vw, 28rem"
                        />
                    </div>

                    {/* Same trick as the product grid: hairlines are the ruled background
                        showing through the gaps between cells. */}
                    <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-hairline">
                        <Stat label="Rating" value={`${rating}/5`} />
                        <Stat label="Reviews" value={String(reviews)} />
                        <Stat label="Size" value={size ?? "—"} />
                        <Stat
                            label="Stock"
                            value={product.stock === undefined ? "—" : String(product.stock)}
                        />
                    </dl>
                </Tabs.Panel>

                <Tabs.Panel value="details" className={tabPanelClassName}>
                    {/* Deliberately not <Drawer.Description>: that sets aria-describedby on
                        the dialog, and this text unmounts whenever another tab is active. */}
                    <p className="text-sm leading-relaxed text-brand/80">
                        {description ?? "No description has been written for this product yet."}
                    </p>
                </Tabs.Panel>

                <Tabs.Panel value="specs" className={tabPanelClassName}>
                    <dl>
                        <InfoRow icon={Tag} label="SKU" value={sku} />
                        <InfoRow icon={Ruler} label="Size" value={size} />
                        <InfoRow icon={Droplets} label="Texture" value={product.texture} />
                        <InfoRow icon={Leaf} label="Skin type" value={product.skinType} />
                        <InfoRow
                            icon={Beaker}
                            label="Key ingredient"
                            value={product.keyIngredient}
                        />
                        <InfoRow
                            icon={Package}
                            label="Availability"
                            value={inStock ? "In stock" : "Sold out"}
                        />
                    </dl>
                </Tabs.Panel>
            </Tabs.Root>
        </Drawer.Content>
    )
}

function PanelTab({ value, children }: { value: string; children: ReactNode }) {
    return (
        <Tabs.Tab
            value={value}
            className="-mb-px px-4 py-3 text-sm text-brand/60 transition-colors hover:text-brand focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand data-active:text-brand"
        >
            {children}
        </Tabs.Tab>
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

const tabPanelClassName =
    "min-h-0 flex-1 overflow-y-auto px-6 py-5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"

const backdropClassName =
    "fixed inset-0 min-h-dvh bg-black opacity-[calc(0.35*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-starting-style:opacity-0 data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]"

// --bleed keeps an extra slab of panel past the right edge, so an overshooting
// swipe never tears open a gap between the panel and the edge of the screen.
const popupClassName =
    "[--bleed:3rem] -mr-[3rem] flex h-full w-[calc(28rem+3rem)] max-w-[calc(100vw-2rem+3rem)] flex-col overflow-hidden overscroll-contain border-l border-hairline bg-paper pr-[3rem] shadow-[-0.5rem_0_2rem] shadow-black/10 outline-none touch-auto [transform:translateX(var(--drawer-swipe-movement-x))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none data-starting-style:[transform:translateX(calc(100%-var(--bleed)+2px))] data-ending-style:[transform:translateX(calc(100%-var(--bleed)+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]"

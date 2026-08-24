import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { CATALOG, activeVariants, findProduct } from "@/data/products"
import { money } from "@/lib/money"
import { ProductImage, Rating } from "@/uicomps/ProductCard"
import VariantPurchase from "@/uicomps/VariantPurchase"

/** Every product is known at build time, so all detail pages can be prerendered. */
export function generateStaticParams() {
    return CATALOG.map((product) => ({ sku: product.sku! }))
}

export async function generateMetadata({
    params,
}: PageProps<"/productList/[sku]">): Promise<Metadata> {
    const { sku } = await params
    const product = findProduct(sku)

    if (!product) return { title: "Product not found" }

    return {
        title: product.name,
        description: product.description,
    }
}

export default async function ProductDetailPage({
    params,
}: PageProps<"/productList/[sku]">) {
    // params is a promise in this version of Next — it has to be awaited before
    // any property is read.
    const { sku } = await params
    const product = findProduct(sku)

    // Renders the app's 404 for an unknown or mistyped SKU.
    if (!product) notFound()

    return (
        <main className="mt-8 overflow-hidden rounded-3xl border border-hairline bg-paper text-brand">
            <div className="border-b border-hairline px-8 py-5">
                <Link
                    href="/productList"
                    className="inline-flex items-center gap-1.5 rounded-xs text-sm transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                    <ChevronLeft className="size-4" />
                    All products
                </Link>
            </div>

            <div className="grid gap-12 px-8 py-12 lg:grid-cols-2 lg:px-12">
                <div className="relative grid h-96 w-full place-items-center rounded-2xl bg-hairline/25 lg:h-[32rem]">
                    <ProductImage
                        name={product.name}
                        image={product.image}
                        sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                </div>

                <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-brand/60">
                        {product.category}
                    </p>

                    <h1 className="mt-4 font-serif text-4xl lowercase lg:text-5xl">
                        {product.name}
                    </h1>

                    <div className="mt-4 flex items-center gap-2 text-xs">
                        <Rating rating={product.rating} />
                        <span>
                            <span className="sr-only">{product.rating} out of 5 stars, </span>
                            {product.reviews} reviews
                        </span>
                    </div>

                    {/* The headline price tracks the cheapest thing actually on sale,
                        so it can never advertise less than any variant costs. */}
                    {/* Cheapest *active* variant, which may be one that is currently
                        out of stock — the same set the size list shows, so the two
                        always agree. Discontinued variants can never set it. */}
                    <p className="mt-6 font-serif text-2xl italic">
                        from {money(Math.min(...activeVariants(product).map((v) => v.price)))}
                    </p>

                    <p className="mt-6 max-w-prose text-sm leading-relaxed text-brand/80">
                        {product.description ??
                            "No description has been written for this product yet."}
                    </p>

                    {/* Filtered here rather than in the client component: passing the
                        raw product would serialise discontinued variants into the RSC
                        payload, shipping data the browser has no business seeing. */}
                    <VariantPurchase
                        product={{ ...product, variants: activeVariants(product) }}
                    />

                    <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-hairline sm:grid-cols-2">
                        <Spec label="Category" value={product.category} />
                        <Spec label="Base SKU" value={product.sku} />
                        <Spec label="Texture" value={product.texture} />
                        <Spec label="Skin type" value={product.skinType} />
                        <Spec label="Key ingredient" value={product.keyIngredient} />
                        <Spec label="Size" value={product.size} />
                    </dl>
                </div>
            </div>
        </main>
    )
}

function Spec({ label, value }: { label: string; value?: string }) {
    if (!value) return null

    return (
        <div className="bg-paper px-5 py-4">
            <dt className="text-xs text-brand/60">{label}</dt>
            <dd className="mt-1 text-sm">{value}</dd>
        </div>
    )
}

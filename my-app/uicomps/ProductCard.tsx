"use client"

import { Drawer } from "@base-ui/react/drawer"
import Image from "next/image"

import { productDrawer } from "@/uicomps/productDrawer"

export type Product = {
    name: string
    price: number
    rating: number
    reviews: number
    isNew?: boolean
    /** Path under /public, e.g. "/products/serum.png". Falls back to a placeholder. */
    image?: string
    // Everything below is only surfaced in the detail panel.
    description?: string
    size?: string
    sku?: string
    skinType?: string
    keyIngredient?: string
    texture?: string
    /** Units on hand. 0 means sold out. */
    stock?: number
}

// Small rotated squares, the way the reference draws its rating marks.
export function Rating({ rating }: { rating: number }) {
    return (
        <span className="flex items-center gap-1" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
                <span
                    key={i}
                    className={`size-1.5 rotate-45 ${
                        i < rating ? "bg-brand" : "bg-brand/25"
                    }`}
                />
            ))}
        </span>
    )
}

export function ProductImage({
    name,
    image,
    sizes = "(max-width: 640px) 100vw, 25vw",
}: Pick<Product, "name" | "image"> & { sizes?: string }) {
    return image ? (
        <Image
            src={image}
            alt={name}
            fill
            sizes={sizes}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
    ) : (
        // Placeholder silhouette until real product photography exists.
        <div className="h-44 w-16 rounded-t-2xl rounded-b bg-linear-to-b from-zinc-200 to-zinc-300 transition-transform duration-300 group-hover:scale-105" />
    )
}

export default function ProductCard(product: Product) {
    const { name, price, rating, reviews, isNew, image } = product

    return (
        <article className="group relative flex flex-col items-center gap-2 px-6 py-8 text-brand transition-colors has-focus-visible:bg-hairline/25 hover:bg-hairline/25">
            <div className="flex items-center gap-2 text-xs">
                <Rating rating={rating} />
                {/* The rating is also stated in text, never shape-only. */}
                <span>
                    <span className="sr-only">{rating} out of 5 stars, </span>
                    {reviews} reviews
                </span>
            </div>

            <p className="h-5 font-serif text-xs italic">{isNew ? "new arrival" : ""}</p>

            <div className="relative my-4 grid h-56 w-full place-items-center">
                <ProductImage name={name} image={image} />
            </div>

            {/* The trigger is just the title, but its ::after is stretched over the whole
                card — so the entire tile is clickable while the accessible name stays
                the product name, and a <button> never has to wrap heading markup. */}
            <h2 className="text-center font-serif text-[15px]">
                <Drawer.Trigger
                    handle={productDrawer}
                    payload={product}
                    className="rounded-xs outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline focus-visible:underline-offset-4"
                >
                    {name}
                </Drawer.Trigger>
            </h2>
            <p className="font-serif text-sm italic">${price.toFixed(2)} eur</p>
        </article>
    )
}

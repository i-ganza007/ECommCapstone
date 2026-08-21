import Link from "next/link"

import { money } from "@/lib/money"
import { ProductImage, Rating, type Product } from "@/uicomps/ProductCard"

export default function FeaturedProductRow({
    product,
    index,
}: {
    product: Product
    index: number
}) {
    // Alternating sides, the way the reference walks its project list down the
    // page. order-* only kicks in once there are two columns to swap.
    const flipped = index % 2 === 1

    return (
        <li className="grid items-center gap-10 px-8 py-12 lg:grid-cols-2 lg:px-12">
            <div className={flipped ? "lg:order-2" : undefined}>
                <h3 className="font-serif text-3xl lowercase lg:text-4xl">{product.name}</h3>

                <div className="mt-4 flex items-center gap-2 text-xs">
                    <Rating rating={product.rating} />
                    {/* Rating is shape-only in the marks, so it is stated here too. */}
                    <span>
                        <span className="sr-only">{product.rating} out of 5 stars, </span>
                        {product.reviews} reviews
                    </span>
                </div>

                <p className="mt-5 max-w-md text-sm leading-relaxed text-brand/80">
                    {product.description}
                </p>

                <p className="mt-6 font-serif text-lg italic">{money(product.price)}</p>

                {product.sku && (
                    <Link
                        href={`/productList/${product.sku}`}
                        className="mt-6 inline-block rounded-full border border-hairline px-5 py-2.5 text-sm transition-colors hover:bg-hairline/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                        View product
                    </Link>
                )}
            </div>

            <div
                className={`relative grid h-72 w-full place-items-center rounded-2xl bg-hairline/25 ${
                    flipped ? "lg:order-1" : ""
                }`}
            >
                <ProductImage
                    name={product.name}
                    image={product.image}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                />
            </div>
        </li>
    )
}

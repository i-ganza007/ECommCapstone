import Link from "next/link"

import { findProduct } from "@/data/products"
import { ProductImage } from "@/uicomps/ProductCard"

/**
 * One tile in the visual menu. The whole card is the link — a picture a visitor
 * is going to click at anyway should not be inert next to a separate text link.
 */
export default function OfferingCard({
    title,
    blurb,
    sku,
    href,
}: {
    title: string
    blurb: string
    sku: string
    href: string
}) {
    // The tile borrows a real product for its picture; if that sku ever leaves
    // the catalogue the block still renders, just without an image.
    const product = findProduct(sku)

    return (
        <li>
            <Link
                href={href}
                className="group block rounded-2xl text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
                <div className="relative grid h-64 w-full place-items-center rounded-2xl bg-hairline/30 transition-colors group-hover:bg-hairline/60">
                    <ProductImage
                        name={product?.name ?? title}
                        image={product?.image}
                        sizes="(max-width: 768px) 100vw, 30vw"
                    />
                </div>

                <h3 className="mt-6 font-serif text-2xl lowercase">{title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-brand/70">
                    {blurb}
                </p>
            </Link>
        </li>
    )
}

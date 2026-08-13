"use client"
import ProductListHeader from "@/uicomps/ProductListHeader"
import ProductCard, { type Product } from "@/uicomps/ProductCard"

const PRODUCTS: Product[] = [
    { name: "Pore Minimizing Serum", price: 68, rating: 5, reviews: 8 },
    { name: "Body Sun Lotion Spf30", price: 39, rating: 5, reviews: 3, isNew: true },
    { name: "Niacinamide Repair Body Lotion", price: 40, rating: 4, reviews: 16 },
    { name: "Daily Hydra Cream - Sensitive", price: 48, rating: 5, reviews: 13 },
    { name: "Deep Cleansing Mask", price: 60, rating: 5, reviews: 21 },
    { name: "Sun Drops", price: 33, rating: 5, reviews: 16 },
    { name: "Body Sun Lotion Spf50", price: 35, rating: 5, reviews: 9 },
    { name: "Vitamin E Serum", price: 75, rating: 4, reviews: 15 },
    { name: "Daily Foaming Cleanser", price: 49, rating: 5, reviews: 16 },
    { name: "Daily Hydra Cream", price: 48, rating: 5, reviews: 13, isNew: true },
    { name: "Nourishing Sanitizer Spray", price: 39, rating: 4, reviews: 15 },
    { name: "Repair Body Balm", price: 40, rating: 5, reviews: 2 },
]

export default function ProductList() {
    return (
        // Width and side margin come from the layout, so this just fills it —
        // same span as the dashboard grid, on a light panel.
        <main className="mt-8 overflow-hidden rounded-3xl border border-hairline bg-paper">
            <ProductListHeader resultCount={PRODUCTS.length} />

            {/* Hairlines come from the gaps: a ruled background showing through. */}
            <div className="grid grid-cols-4 gap-0.5 bg-hairline">
                {PRODUCTS.map((product) => (
                    <div key={product.name} className="bg-paper">
                        <ProductCard {...product} />
                    </div>
                ))}
            </div>
        </main>
    )
}

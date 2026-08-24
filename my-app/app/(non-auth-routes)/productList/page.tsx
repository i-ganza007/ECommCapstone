"use client"
import { PRODUCTS } from "@/data/products"
import ProductListHeader from "@/uicomps/ProductListHeader"
import ProductCard from "@/uicomps/ProductCard"
import ProductDetailPanel from "@/uicomps/ProductDetailPanel"

export default function ProductList() {
    return (
        <main className="mt-8 overflow-hidden rounded-3xl border border-hairline bg-paper">
            <ProductListHeader resultCount={PRODUCTS.length} />

            <div className="grid grid-cols-4 gap-0.5 bg-hairline">
                {PRODUCTS.map((product) => (
                    <div key={product.name} className="bg-paper">
                        <ProductCard {...product} />
                    </div>
                ))}
            </div>

            <ProductDetailPanel />
        </main>
    )
}

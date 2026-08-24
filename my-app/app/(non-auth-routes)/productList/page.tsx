"use client"
import { PRODUCTS } from "@/data/products"
import { useCatalogStore } from "@/store/catalog"
import { useCatalogHydrated } from "@/store/useCatalogHydrated"
import ProductListHeader from "@/uicomps/ProductListHeader"
import ProductCard from "@/uicomps/ProductCard"
import ProductDetailPanel from "@/uicomps/ProductDetailPanel"

export default function ProductList() {
    const hydrated = useCatalogHydrated()
    const created = useCatalogStore((state) => state.created)

    
    const products = hydrated ? [...created, ...PRODUCTS] : PRODUCTS

    return (
        <main className="mt-8 overflow-hidden rounded-3xl border border-hairline bg-paper">
            <ProductListHeader resultCount={products.length} />

            <div className="grid grid-cols-4 gap-0.5 bg-hairline">
                {products.map((product) => (
                    <div key={product.sku ?? product.name} className="bg-paper">
                        <ProductCard {...product} />
                    </div>
                ))}
            </div>

            <ProductDetailPanel />
        </main>
    )
}

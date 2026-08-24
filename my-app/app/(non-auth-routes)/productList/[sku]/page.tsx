import type { Metadata } from "next"

import { CATALOG, findProduct } from "@/data/products"
import DraftProductDetail from "@/uicomps/DraftProductDetail"
import ProductDetailView from "@/uicomps/ProductDetailView"

export function generateStaticParams() {
    return CATALOG.map((product) => ({ sku: product.sku! }))
}

export async function generateMetadata({
    params,
}: PageProps<"/productList/[sku]">): Promise<Metadata> {
    const { sku } = await params
    const product = findProduct(sku)

 
    if (!product) return { title: sku }

    return {
        title: product.name,
        description: product.description,
    }
}

export default async function ProductDetailPage({
    params,
}: PageProps<"/productList/[sku]">) {
   
    const { sku } = await params
    const product = findProduct(sku)

   
    if (!product) return <DraftProductDetail sku={sku} />

    return <ProductDetailView product={product} />
}

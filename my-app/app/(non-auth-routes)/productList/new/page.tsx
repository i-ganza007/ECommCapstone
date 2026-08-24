import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import CreateProductForm from "@/uicomps/CreateProductForm"

export const metadata: Metadata = {
    title: "New product",
    description: "Add a product and its variants to the catalogue.",
}

export default function NewProductPage() {
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

            <header className="border-b border-hairline px-8 py-10 lg:px-12">
                <h1 className="font-serif text-5xl lowercase lg:text-6xl">new product</h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand/70">
                    A product is the thing on the shelf; its variants are the sizes you
                    can actually buy. Each variant carries its own SKU, price and unit
                    count.
                </p>
            </header>

            <CreateProductForm />
        </main>
    )
}

"use client"
import ProductListHeader from "@/uicomps/ProductListHeader"
import ProductCard, { type Product } from "@/uicomps/ProductCard"
import ProductDetailPanel from "@/uicomps/ProductDetailPanel"

const PRODUCTS: Product[] = [
    {
        name: "Pore Minimizing Serum",
        price: 68,
        rating: 5,
        reviews: 8,
        sku: "SER-PM-30",
        size: "30 ml",
        texture: "Lightweight fluid",
        skinType: "Oily / combination",
        keyIngredient: "2% Salicylic acid",
        stock: 42,
        description:
            "A daily serum that clears congestion and refines the look of enlarged pores. Layers under moisturiser without pilling.",
    },
    {
        name: "Body Sun Lotion Spf30",
        price: 39,
        rating: 5,
        reviews: 3,
        isNew: true,
        sku: "SUN-BL-200",
        size: "200 ml",
        texture: "Milky lotion",
        skinType: "All skin types",
        keyIngredient: "Zinc oxide",
        stock: 18,
        description:
            "Broad spectrum body protection that sinks in without a white cast. Water resistant for 40 minutes.",
    },
    {
        name: "Niacinamide Repair Body Lotion",
        price: 40,
        rating: 4,
        reviews: 16,
        sku: "BOD-NR-250",
        size: "250 ml",
        texture: "Rich cream",
        skinType: "Dry / dehydrated",
        keyIngredient: "5% Niacinamide",
        stock: 7,
        description:
            "Rebuilds the moisture barrier over rough, textured areas. Best applied to damp skin straight after showering.",
    },
    {
        name: "Daily Hydra Cream - Sensitive",
        price: 48,
        rating: 5,
        reviews: 13,
        sku: "CRM-HS-50",
        size: "50 ml",
        texture: "Cushiony balm",
        skinType: "Sensitive / reactive",
        keyIngredient: "Ceramide complex",
        stock: 25,
        description:
            "A fragrance-free daily cream for skin that flushes easily. Calms tightness within a few minutes of use.",
    },
    {
        name: "Deep Cleansing Mask",
        price: 60,
        rating: 5,
        reviews: 21,
        sku: "MSK-DC-75",
        size: "75 ml",
        texture: "Clay paste",
        skinType: "Oily / congested",
        keyIngredient: "Kaolin clay",
        stock: 0,
        description:
            "A ten minute weekly mask that draws out build-up without stripping. Rinses clean with warm water.",
    },
    {
        name: "Sun Drops",
        price: 33,
        rating: 5,
        reviews: 16,
        sku: "SUN-DR-15",
        size: "15 ml",
        texture: "Serum drops",
        skinType: "All skin types",
        keyIngredient: "Vitamin C ester",
        stock: 61,
        description:
            "Concentrated drops that warm the complexion and even out tone. Mix a few into your moisturiser each morning.",
    },
    {
        name: "Body Sun Lotion Spf50",
        price: 35,
        rating: 5,
        reviews: 9,
        sku: "SUN-BL-201",
        size: "200 ml",
        texture: "Milky lotion",
        skinType: "All skin types",
        keyIngredient: "Zinc oxide",
        stock: 30,
        description:
            "The higher factor of our body lotion, for long days outdoors. Same weightless finish, no white cast.",
    },
    {
        name: "Vitamin E Serum",
        price: 75,
        rating: 4,
        reviews: 15,
        sku: "SER-VE-30",
        size: "30 ml",
        texture: "Silky oil",
        skinType: "Dry / mature",
        keyIngredient: "Vitamin E",
        stock: 12,
        description:
            "An overnight oil-serum that softens fine lines and restores suppleness while you sleep.",
    },
    {
        name: "Daily Foaming Cleanser",
        price: 49,
        rating: 5,
        reviews: 16,
        sku: "CLN-DF-150",
        size: "150 ml",
        texture: "Gel-to-foam",
        skinType: "All skin types",
        keyIngredient: "Amino acid surfactants",
        stock: 54,
        description:
            "A pH-balanced cleanser that lifts sunscreen and grime without leaving skin squeaky. Morning and night.",
    },
    {
        name: "Daily Hydra Cream",
        price: 48,
        rating: 5,
        reviews: 13,
        isNew: true,
        sku: "CRM-DH-50",
        size: "50 ml",
        texture: "Light cream",
        skinType: "Normal / combination",
        keyIngredient: "Hyaluronic acid",
        stock: 38,
        description:
            "The everyday moisturiser of the range. Holds hydration for a full day and sits well under makeup.",
    },
    {
        name: "Nourishing Sanitizer Spray",
        price: 39,
        rating: 4,
        reviews: 15,
        sku: "SAN-NS-100",
        size: "100 ml",
        texture: "Fine mist",
        skinType: "All skin types",
        keyIngredient: "Glycerin + 70% alcohol",
        stock: 21,
        description:
            "A hand mist that sanitises without the usual sting, thanks to a glycerin base that leaves skin conditioned.",
    },
    {
        name: "Repair Body Balm",
        price: 40,
        rating: 5,
        reviews: 2,
        sku: "BOD-RB-100",
        size: "100 ml",
        texture: "Thick balm",
        skinType: "Very dry / cracked",
        keyIngredient: "Shea butter",
        stock: 9,
        description:
            "An occlusive balm for elbows, heels and knuckles. A little goes a long way on stubborn dry patches.",
    },
]

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

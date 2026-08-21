import type { Product } from "@/uicomps/ProductCard"

// The catalogue. Lifted out of the product list page so the home page can
// feature real products instead of keeping a second copy in sync.
export const PRODUCTS: Product[] = [
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


/** The three shown on the home page, in order. */
export const FEATURED_SKUS = ["SER-PM-30", "CRM-DH-50", "MSK-DC-75"] as const

export const FEATURED = FEATURED_SKUS.map(
    (sku) => PRODUCTS.find((product) => product.sku === sku)!,
)

/* -------------------------------------------------------------------------- */
/*  Categories and variants                                                    */
/* -------------------------------------------------------------------------- */

export type StockStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK"

/** At or below this many units a variant is reported as running low. */
export const LOW_STOCK_THRESHOLD = 10

/**
 * Status is derived from the unit count rather than stored alongside it, so the
 * two can never disagree — there is no way to have `OUT_OF_STOCK` sitting on a
 * variant with stock left.
 */
export function stockStatus(stock: number): StockStatus {
    if (stock <= 0) return "OUT_OF_STOCK"
    if (stock <= LOW_STOCK_THRESHOLD) return "LOW_STOCK"
    return "IN_STOCK"
}

export const STOCK_STATUS_LABEL: Record<StockStatus, string> = {
    IN_STOCK: "In stock",
    LOW_STOCK: "Low stock",
    OUT_OF_STOCK: "Out of stock",
}

export interface Variant {
    /** Unique across the whole catalogue — it is the cart line's identity. */
    sku: string
    label: string
    price: number
    stock: number
    /** Discontinued variants stay in the data but must never be offered. */
    isActive: boolean
}

export interface CatalogProduct extends Product {
    category: string
    variants: Variant[]
}

const CATEGORY_BY_SKU: Record<string, string> = {
    "SER-PM-30": "Serums",
    "SUN-BL-200": "Sun care",
    "BOD-NR-250": "Body",
    "CRM-HS-50": "Moisturisers",
    "MSK-DC-75": "Masks",
    "SUN-DR-15": "Sun care",
    "SUN-BL-201": "Sun care",
    "SER-VE-30": "Serums",
    "CLN-DF-150": "Cleansers",
    "CRM-DH-50": "Moisturisers",
    "SAN-NS-100": "Hands",
    "BOD-RB-100": "Body",
}

type VariantSeed = Omit<Variant, "sku" | "isActive"> & {
    /** Appended to the product SKU to form the variant SKU. */
    suffix: string
    isActive?: boolean
}

// The first seed of each product mirrors the product's own size, price and
// stock, so the list page and the detail page never quote different numbers.
const VARIANT_SEEDS: Record<string, VariantSeed[]> = {
    "SER-PM-30": [
        { suffix: "30", label: "30 ml", price: 68, stock: 42 },
        { suffix: "50", label: "50 ml", price: 98, stock: 6 },
        { suffix: "15", label: "15 ml travel", price: 38, stock: 24, isActive: false },
    ],
    "SUN-BL-200": [
        { suffix: "200", label: "200 ml", price: 39, stock: 18 },
        { suffix: "400", label: "400 ml", price: 62, stock: 0 },
    ],
    "BOD-NR-250": [
        { suffix: "250", label: "250 ml", price: 40, stock: 7 },
        { suffix: "500", label: "500 ml", price: 68, stock: 31 },
    ],
    "CRM-HS-50": [
        { suffix: "50", label: "50 ml", price: 48, stock: 25 },
        { suffix: "15", label: "15 ml travel", price: 22, stock: 9 },
    ],
    "MSK-DC-75": [
        { suffix: "75", label: "75 ml", price: 60, stock: 0 },
        { suffix: "150", label: "150 ml", price: 96, stock: 4 },
    ],
    "SUN-DR-15": [
        { suffix: "15", label: "15 ml", price: 33, stock: 61 },
        { suffix: "30", label: "30 ml", price: 58, stock: 12 },
    ],
    "SUN-BL-201": [
        { suffix: "200", label: "200 ml", price: 35, stock: 30 },
        { suffix: "400", label: "400 ml", price: 58, stock: 3 },
    ],
    "SER-VE-30": [
        { suffix: "30", label: "30 ml", price: 75, stock: 12 },
        { suffix: "50", label: "50 ml", price: 110, stock: 0 },
    ],
    "CLN-DF-150": [
        { suffix: "150", label: "150 ml", price: 49, stock: 54 },
        { suffix: "300", label: "300 ml", price: 79, stock: 16 },
    ],
    "CRM-DH-50": [
        { suffix: "50", label: "50 ml", price: 48, stock: 38 },
        { suffix: "100", label: "100 ml", price: 82, stock: 8 },
    ],
    "SAN-NS-100": [{ suffix: "100", label: "100 ml", price: 39, stock: 21 }],
    "BOD-RB-100": [
        { suffix: "100", label: "100 ml", price: 40, stock: 9 },
        { suffix: "200", label: "200 ml", price: 68, stock: 0 },
    ],
}

/** Products with their category and variants attached. */
export const CATALOG: CatalogProduct[] = PRODUCTS.map((product) => {
    const sku = product.sku!
    const seeds = VARIANT_SEEDS[sku] ?? [
        { suffix: "std", label: product.size ?? "One size", price: product.price, stock: product.stock ?? 0 },
    ]

    return {
        ...product,
        category: CATEGORY_BY_SKU[sku] ?? "Skincare",
        variants: seeds.map(({ suffix, isActive = true, ...rest }) => ({
            ...rest,
            sku: `${sku}-${suffix}`,
            isActive,
        })),
    }
})

export function findProduct(sku: string): CatalogProduct | undefined {
    return CATALOG.find((product) => product.sku === sku)
}

/** The only variants that may ever be shown or sold. */
export function activeVariants(product: CatalogProduct): Variant[] {
    return product.variants.filter((variant) => variant.isActive)
}

/**
 * Flattens a product + chosen variant into the plain `Product` the cart stores.
 * The variant SKU becomes the line's identity, so two sizes of one product are
 * two lines, each clamped to its own stock — the cart needed no changes at all.
 *
 * `category` and `variants` are dropped deliberately: the cart is persisted to
 * localStorage and has no use for the other sizes of something already chosen.
 */
export function variantAsCartLine(product: CatalogProduct, variant: Variant): Product {
    const { category, variants, ...base } = product
    void category
    void variants

    return {
        ...base,
        name: `${product.name} — ${variant.label}`,
        sku: variant.sku,
        price: variant.price,
        stock: variant.stock,
        size: variant.label,
    }
}

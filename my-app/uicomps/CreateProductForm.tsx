"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Plus, X } from "lucide-react"

import { CATALOG, stockStatus, type CatalogProduct, type Variant } from "@/data/products"
import { money } from "@/lib/money"
import { cn } from "@/lib/utils"
import { useCatalogStore, usedSkus } from "@/store/catalog"
import { useCatalogHydrated } from "@/store/useCatalogHydrated"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import CategoryCombobox from "@/uicomps/CategoryCombobox"
import StockBadge from "@/uicomps/StockBadge"

/** Categories already in use, offered as suggestions without being a closed set. */
const CATEGORIES = [...new Set(CATALOG.map((product) => product.category))].sort()

/** A SKU is an identifier, not prose: capitals, digits and hyphens. */
const SKU_PATTERN = /^[A-Z0-9]+(-[A-Z0-9]+)*$/

type VariantDraft = {
    /** Local key only — never leaves the form. */
    id: number
    suffix: string
    label: string
    price: string
    stock: string
    isActive: boolean
}

type VariantErrors = Partial<Record<"suffix" | "label" | "price" | "stock", string>>

type Errors = {
    name?: string
    sku?: string
    category?: string
    /** Keyed by variant draft id. */
    variants?: Record<number, VariantErrors>
    variantList?: string
}

/**
 * Row ids are local and only ever used as React keys and to build field ids.
 * They are handed out from a ref rather than a module-level counter: a counter
 * at module scope is shared by every render the server process performs, so the
 * ids would differ from the ones the browser generates and hydration would
 * mismatch on every label's `for`.
 */
const emptyVariant = (id: number): VariantDraft => ({
    id,
    suffix: "",
    label: "",
    price: "",
    stock: "",
    isActive: true,
})

/**
 * Parses a number typed into a text field. Returns undefined for anything that
 * is not a finite number, so "12abc" is rejected rather than silently becoming
 * 12 the way parseFloat would have it.
 */
function toNumber(value: string): number | undefined {
    const trimmed = value.trim()
    if (trimmed === "") return undefined

    const parsed = Number(trimmed)
    return Number.isFinite(parsed) ? parsed : undefined
}

export default function CreateProductForm() {
    const router = useRouter()

    const hydrated = useCatalogHydrated()
    const created = useCatalogStore((state) => state.created)
    const addProduct = useCatalogStore((state) => state.addProduct)

    const [name, setName] = React.useState("")
    const [sku, setSku] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [texture, setTexture] = React.useState("")
    const [skinType, setSkinType] = React.useState("")
    const [keyIngredient, setKeyIngredient] = React.useState("")

    // Unique per form instance and stable across server and client, so the field
    // ids below are too.
    const idPrefix = React.useId()
    const nextRowId = React.useRef(1)

    const [variants, setVariants] = React.useState<VariantDraft[]>(() => [emptyVariant(0)])
    const [errors, setErrors] = React.useState<Errors>({})

    const taken = React.useMemo(() => usedSkus(created), [created])

    function updateVariant(id: number, patch: Partial<VariantDraft>) {
        setVariants((current) =>
            current.map((variant) => (variant.id === id ? { ...variant, ...patch } : variant)),
        )
    }

    function validate(): Errors {
        const next: Errors = {}

        if (!name.trim()) next.name = "Give the product a name."

        const normalisedSku = sku.trim().toUpperCase()
        if (!normalisedSku) next.sku = "Every product needs a base SKU."
        else if (!SKU_PATTERN.test(normalisedSku))
            next.sku = "Capitals, digits and hyphens only — e.g. SER-PM-30."
        else if (taken.has(normalisedSku))
            next.sku = "That SKU is already in the catalogue. Pick another."

        if (!category.trim()) next.category = "Choose or type a category."

        const variantErrors: Record<number, VariantErrors> = {}
        const seenSuffixes = new Map<string, number>()

        for (const variant of variants) {
            const found: VariantErrors = {}
            const suffix = variant.suffix.trim().toUpperCase()

            if (!suffix) found.suffix = "Required."
            else if (!SKU_PATTERN.test(suffix)) found.suffix = "Capitals, digits, hyphens."
            else if (seenSuffixes.has(suffix)) found.suffix = "Already used above."
            else seenSuffixes.set(suffix, variant.id)

            if (!variant.label.trim()) found.label = "Required."

            const price = toNumber(variant.price)
            if (price === undefined) found.price = "Required."
            else if (price < 0) found.price = "Cannot be negative."

            const stock = toNumber(variant.stock)
            if (stock === undefined) found.stock = "Required."
            else if (stock < 0) found.stock = "Cannot be negative."
            else if (!Number.isInteger(stock)) found.stock = "Whole units only."

            if (Object.keys(found).length > 0) variantErrors[variant.id] = found
        }

        if (Object.keys(variantErrors).length > 0) next.variants = variantErrors

        // A product whose every variant is discontinued can never be bought, and
        // the detail page has no price to quote for it.
        if (!variants.some((variant) => variant.isActive))
            next.variantList = "At least one variant has to be available to buy."

        return next
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const found = validate()
        setErrors(found)
        if (Object.keys(found).length > 0) return

        const baseSku = sku.trim().toUpperCase()

        const builtVariants: Variant[] = variants.map((variant) => ({
            sku: `${baseSku}-${variant.suffix.trim().toUpperCase()}`,
            label: variant.label.trim(),
            price: toNumber(variant.price)!,
            stock: toNumber(variant.stock)!,
            isActive: variant.isActive,
        }))

        // The product's own price, size and stock mirror its first variant —
        // the same invariant the seeded catalogue keeps, so the card in the grid
        // and the detail page never quote different numbers.
        const [first] = builtVariants

        const product: CatalogProduct = {
            name: name.trim(),
            sku: baseSku,
            category: category.trim(),
            price: first.price,
            size: first.label,
            stock: first.stock,
            variants: builtVariants,
            // Nobody has rated something that did not exist a minute ago. Zero is
            // the truth here, and the card states it in text either way.
            rating: 0,
            reviews: 0,
            isNew: true,
            description: description.trim() || undefined,
            texture: texture.trim() || undefined,
            skinType: skinType.trim() || undefined,
            keyIngredient: keyIngredient.trim() || undefined,
        }

        addProduct(product)
        router.push(`/productList/${baseSku}`)
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="px-8 py-10 lg:px-12">
            <FieldGroup className="max-w-3xl">
                <FieldSet>
                    <FieldLegend>The product</FieldLegend>

                    <Field data-invalid={!!errors.name}>
                        <FieldLabel htmlFor="product-name">Name</FieldLabel>
                        <Input
                            id="product-name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Pore Minimizing Serum"
                            aria-invalid={!!errors.name}
                        />
                        <FieldError>{errors.name}</FieldError>
                    </Field>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <Field data-invalid={!!errors.sku}>
                            <FieldLabel htmlFor="product-sku">Base SKU</FieldLabel>
                            <Input
                                id="product-sku"
                                value={sku}
                                // Upper-cased as it is typed so what is checked for
                                // uniqueness is what the field shows.
                                onChange={(event) => setSku(event.target.value.toUpperCase())}
                                placeholder="SER-PM-30"
                                aria-invalid={!!errors.sku}
                                className="font-mono"
                            />
                            <FieldDescription>
                                Each variant&apos;s SKU is built from this one.
                            </FieldDescription>
                            <FieldError>{errors.sku}</FieldError>
                        </Field>

                        <Field data-invalid={!!errors.category}>
                            <FieldLabel htmlFor="product-category">Category</FieldLabel>
                            {/* Suggestions, not a closed set — a new product may
                                well be the first of a new category. */}
                            <CategoryCombobox
                                id="product-category"
                                value={category}
                                onValueChange={setCategory}
                                categories={CATEGORIES}
                                placeholder="Serums"
                                invalid={!!errors.category}
                            />
                            <FieldError>{errors.category}</FieldError>
                        </Field>
                    </div>

                    <Field>
                        <FieldLabel htmlFor="product-description">Description</FieldLabel>
                        <textarea
                            id="product-description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            rows={3}
                            placeholder="What it does, and who it is for."
                            className="w-full rounded-md border border-input bg-transparent px-2.5 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                        />
                    </Field>
                </FieldSet>

                <FieldSet>
                    <FieldLegend>Specifics</FieldLegend>
                    <FieldDescription>
                        Optional. Each one that is filled in shows on the detail page.
                    </FieldDescription>

                    <div className="grid gap-6 sm:grid-cols-3">
                        <Field>
                            <FieldLabel htmlFor="product-texture">Texture</FieldLabel>
                            <Input
                                id="product-texture"
                                value={texture}
                                onChange={(event) => setTexture(event.target.value)}
                                placeholder="Lightweight fluid"
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="product-skin-type">Skin type</FieldLabel>
                            <Input
                                id="product-skin-type"
                                value={skinType}
                                onChange={(event) => setSkinType(event.target.value)}
                                placeholder="Oily / combination"
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="product-ingredient">Key ingredient</FieldLabel>
                            <Input
                                id="product-ingredient"
                                value={keyIngredient}
                                onChange={(event) => setKeyIngredient(event.target.value)}
                                placeholder="2% Salicylic acid"
                            />
                        </Field>
                    </div>
                </FieldSet>

                <FieldSet>
                    <FieldLegend>Variants</FieldLegend>
                    <FieldDescription>
                        One row per size. The first row sets the price and size shown on
                        the product card; a row that is not available stays in the data
                        but is never offered for sale.
                    </FieldDescription>

                    <div className="space-y-3">
                        {variants.map((variant, index) => (
                            <VariantRow
                                key={variant.id}
                                variant={variant}
                                index={index}
                                idPrefix={idPrefix}
                                baseSku={sku.trim().toUpperCase()}
                                errors={errors.variants?.[variant.id]}
                                canRemove={variants.length > 1}
                                onChange={(patch) => updateVariant(variant.id, patch)}
                                onRemove={() =>
                                    setVariants((current) =>
                                        current.filter((row) => row.id !== variant.id),
                                    )
                                }
                            />
                        ))}
                    </div>

                    {errors.variantList && (
                        <p role="alert" className="text-sm text-destructive">
                            {errors.variantList}
                        </p>
                    )}

                    <div>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() =>
                                setVariants((current) => [
                                    ...current,
                                    emptyVariant(nextRowId.current++),
                                ])
                            }
                        >
                            <Plus className="size-4" />
                            Add a variant
                        </Button>
                    </div>
                </FieldSet>
            </FieldGroup>

            <div className="mt-10 flex flex-wrap items-center gap-3">
                {/* Disabled until the store has loaded: the SKU uniqueness check
                    reads created products, and before hydration that list is empty
                    — it would wave through a duplicate. */}
                <Button type="submit" disabled={!hydrated}>
                    {hydrated ? "Create product" : "Loading catalogue…"}
                </Button>

                <Button type="button" variant="ghost" onClick={() => router.push("/productList")}>
                    Cancel
                </Button>
            </div>

            <p className="mt-6 max-w-2xl text-xs leading-relaxed text-brand/60">
                Saved in this browser only. There is no server behind this form, so the
                product appears in your product list on this device and nowhere else.
            </p>
        </form>
    )
}

function VariantRow({
    variant,
    index,
    idPrefix,
    baseSku,
    errors,
    canRemove,
    onChange,
    onRemove,
}: {
    variant: VariantDraft
    index: number
    idPrefix: string
    baseSku: string
    errors?: VariantErrors
    canRemove: boolean
    onChange: (patch: Partial<VariantDraft>) => void
    onRemove: () => void
}) {
    const price = toNumber(variant.price)
    const stock = toNumber(variant.stock)
    const suffix = variant.suffix.trim().toUpperCase()

    return (
        <fieldset
            className={cn(
                "rounded-2xl border px-5 py-4",
                variant.isActive ? "border-hairline" : "border-hairline bg-hairline/20",
            )}
        >
            <legend className="sr-only">Variant {index + 1}</legend>

            <div className="grid gap-4 sm:grid-cols-[1fr_1fr_7rem_7rem_auto] sm:items-start">
                <RowField
                    id={`${idPrefix}-variant-${variant.id}-label`}
                    label="Size / label"
                    value={variant.label}
                    onChange={(value) => onChange({ label: value })}
                    placeholder="30 ml"
                    error={errors?.label}
                />

                <RowField
                    id={`${idPrefix}-variant-${variant.id}-suffix`}
                    label="SKU suffix"
                    value={variant.suffix}
                    onChange={(value) => onChange({ suffix: value.toUpperCase() })}
                    placeholder="30"
                    error={errors?.suffix}
                    className="font-mono"
                />

                <RowField
                    id={`${idPrefix}-variant-${variant.id}-price`}
                    label="Price"
                    value={variant.price}
                    onChange={(value) => onChange({ price: value })}
                    placeholder="68"
                    inputMode="decimal"
                    error={errors?.price}
                />

                <RowField
                    id={`${idPrefix}-variant-${variant.id}-stock`}
                    label="Units"
                    value={variant.stock}
                    onChange={(value) => onChange({ stock: value })}
                    placeholder="42"
                    inputMode="numeric"
                    error={errors?.stock}
                />

                <button
                    type="button"
                    onClick={onRemove}
                    disabled={!canRemove}
                    aria-label={`Remove variant ${index + 1}`}
                    title={canRemove ? undefined : "A product needs at least one variant"}
                    className="mt-6 grid size-9 place-items-center rounded-full border border-hairline transition-colors hover:bg-hairline/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-30 disabled:hover:bg-transparent"
                >
                    <X className="size-4" />
                </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <label className="flex items-center gap-2.5 text-sm">
                    <input
                        type="checkbox"
                        checked={variant.isActive}
                        onChange={(event) => onChange({ isActive: event.target.checked })}
                        className="size-4 accent-brand"
                    />
                    Available to buy
                </label>

                {/* What this row will actually become, shown while it is typed —
                    the SKU is assembled from two fields and is easy to get wrong. */}
                <p className="flex items-center gap-3 text-xs text-brand/60">
                    <span className="font-mono">
                        {baseSku && suffix ? `${baseSku}-${suffix}` : "SKU appears here"}
                    </span>
                    {price !== undefined && <span>{money(price)}</span>}
                    {stock !== undefined && stock >= 0 && (
                        <StockBadge status={stockStatus(stock)} />
                    )}
                </p>
            </div>
        </fieldset>
    )
}

function RowField({
    id,
    label,
    value,
    onChange,
    placeholder,
    error,
    inputMode,
    className,
}: {
    id: string
    label: string
    value: string
    onChange: (value: string) => void
    placeholder: string
    error?: string
    inputMode?: "decimal" | "numeric"
    className?: string
}) {
    return (
        <Field data-invalid={!!error}>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <Input
                id={id}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                inputMode={inputMode}
                aria-invalid={!!error}
                className={className}
            />
            <FieldError>{error}</FieldError>
        </Field>
    )
}

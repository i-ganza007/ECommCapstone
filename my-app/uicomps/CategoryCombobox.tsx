"use client"

import { Autocomplete } from "@base-ui/react/autocomplete"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

/**
 * Category picker: a styled list of the categories already in use, over an input
 * that still accepts anything typed into it.
 *
 * Built on Autocomplete rather than Combobox on purpose — Combobox is for a
 * value that must come from the list, and a new product may well be the first of
 * a new category. The list suggests; it does not constrain.
 *
 * This replaces a native `<datalist>`, whose popup is drawn by the browser and
 * cannot be styled at all.
 */
export default function CategoryCombobox({
    id,
    value,
    onValueChange,
    categories,
    invalid,
    placeholder,
}: {
    id: string
    value: string
    onValueChange: (value: string) => void
    categories: readonly string[]
    invalid?: boolean
    placeholder?: string
}) {
    // Whether what has been typed is a category that already exists decides what
    // the empty state says — "no match" would be misleading when no match is
    // exactly what creating a new category looks like.
    const isKnown = categories.some(
        (category) => category.toLowerCase() === value.trim().toLowerCase(),
    )

    return (
        <Autocomplete.Root
            items={categories}
            value={value}
            onValueChange={onValueChange}
            // Clicking the field shows the whole list, so the categories are
            // discoverable without having to guess a first letter.
            openOnInputClick
        >
            <div className="relative">
                <Autocomplete.Input
                    render={<Input id={id} aria-invalid={invalid} className="pr-10" />}
                    placeholder={placeholder}
                />

                <Autocomplete.Trigger
                    aria-label="Show categories"
                    className="absolute inset-y-0 right-0 grid w-10 place-items-center rounded-md text-brand/60 outline-none transition-transform focus-visible:ring-2 focus-visible:ring-ring/50 data-popup-open:rotate-180"
                >
                    <ChevronDown className="size-4" />
                </Autocomplete.Trigger>
            </div>

            <Autocomplete.Portal>
                <Autocomplete.Positioner
                    sideOffset={6}
                    align="start"
                    className="isolate z-50 outline-hidden"
                >
                    <Autocomplete.Popup
                        className={cn(
                            "w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin)",
                            "overflow-hidden rounded-xl border border-hairline bg-paper text-brand shadow-lg shadow-black/5",
                            "duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
                            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
                        )}
                    >
                        <Autocomplete.Empty className="px-3 py-3 text-sm text-brand/60">
                            {value.trim() === ""
                                ? "No categories yet."
                                : `“${value.trim()}” will be created as a new category.`}
                        </Autocomplete.Empty>

                        <Autocomplete.List className="max-h-[min(18rem,var(--available-height))] scroll-py-1 overflow-y-auto overscroll-contain p-1 outline-0 data-empty:p-0">
                            {(category: string) => (
                                <Autocomplete.Item
                                    key={category}
                                    value={category}
                                    className="flex cursor-default items-center rounded-lg px-3 py-2 text-sm outline-hidden select-none data-highlighted:bg-hairline/60"
                                >
                                    {category}
                                </Autocomplete.Item>
                            )}
                        </Autocomplete.List>

                        {/* Only when something is typed that is not already a
                            category — otherwise it is noise under every list. */}
                        {value.trim() !== "" && !isKnown && (
                            <p className="border-t border-hairline px-3 py-2 text-xs text-brand/60">
                                Keep typing to add a new category.
                            </p>
                        )}
                    </Autocomplete.Popup>
                </Autocomplete.Positioner>
            </Autocomplete.Portal>
        </Autocomplete.Root>
    )
}

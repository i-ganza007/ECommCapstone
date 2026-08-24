"use client"
import { ChevronDown, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import ShadcnDropDown from "./ShadcnDropDown"
import ShadcnDropDownCheckbox from "./ShadcnDropDownCheckbox"

/** One cell of the filter bar: fills its share of the row and reads as a control. */
const cellTriggerClass = (grow: string) =>
    `flex items-center justify-center gap-1.5 px-6 py-4 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand ${grow}`

export default function ProductListHeader({ resultCount }: { resultCount: number }) {
    return (
        <header>
            <div className="flex border-b border-hairline px-8 py-10 justify-between">
                <h1 className=" text-6xl font-semibold lowercase tracking-tight text-brand lg:text-8xl">
                all products
                </h1>
                 <div className="flex flex-col items-end gap-4">
                    <Field orientation="horizontal" className="w-96">
                        <Input type="search" placeholder="Search..." />
                        <Button>Search</Button>
                    </Field>

                    <Link
                        href="/productList/new"
                        className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm text-paper transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                        <Plus className="size-4" />
                        New product
                    </Link>
                </div>
            </div>

            {/* Three equal cells divided by hairlines, matching the grid below. */}
            <div className="flex divide-y divide-hairline border-b border-hairline text-sm text-brand sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <p className="px-6 py-4 text-center grow-3">{resultCount} results</p>

                {/* No wrapping <button>: each dropdown renders its own trigger
                    button, and a button inside a button is invalid HTML that
                    React refuses to hydrate. The cell's layout and hover live on
                    the trigger itself, so the whole cell stays clickable. */}
                <ShadcnDropDownCheckbox className={cellTriggerClass("grow-5")}>
                    Filters
                    <ChevronDown className="size-4" />
                </ShadcnDropDownCheckbox>

                <ShadcnDropDown className={cellTriggerClass("grow-3")}>
                    Sort by / popularity <ChevronDown className="size-4" />
                </ShadcnDropDown>
            </div>
        </header>
    )
}

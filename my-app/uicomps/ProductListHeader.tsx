"use client"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import ShadcnDropDown from "./ShadcnDropDown"
import ShadcnDropDownCheckbox from "./ShadcnDropDownCheckbox"
export default function ProductListHeader({ resultCount }: { resultCount: number }) {
    return (
        <header>
            <div className="flex border-b border-hairline px-8 py-10 justify-between">
                <h1 className=" text-6xl font-semibold lowercase tracking-tight text-brand lg:text-8xl">
                all products
                </h1>
                 <Field orientation="horizontal" className="w-96">
                    <Input type="search" placeholder="Search..." />
                    <Button>Search</Button>
                </Field>
            </div>

            {/* Three equal cells divided by hairlines, matching the grid below. */}
            <div className="flex divide-y divide-hairline border-b border-hairline text-sm text-brand sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <p className="px-6 py-4 text-center grow-3">{resultCount} results</p>

                <button
                    type="button"
                    className="flex items-center grow-5 justify-center gap-1.5 px-6 py-4 transition-opacity hover:opacity-70"
                >
                    
                    <ShadcnDropDownCheckbox>
                        Filters
                        <ChevronDown className="size-4" />
                    </ShadcnDropDownCheckbox>
                </button>

                <button
                    type="button"
                    className="flex items-center grow-3 justify-center gap-1.5 px-6 py-4 transition-opacity hover:opacity-70"
                >
                    
                    <ShadcnDropDown>
                        Sort by / popularity <ChevronDown className="size-4" />
                    </ShadcnDropDown>
                </button>
            </div>
        </header>
    )
}

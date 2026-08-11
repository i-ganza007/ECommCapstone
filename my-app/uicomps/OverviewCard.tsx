"use client"

import { useState } from "react"
import { ChevronDown, Upload } from "lucide-react"
import Card from "./Card"
import Money from "./Money"
import { cn } from "@/lib/utils"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const BARS_PER_MONTH = 5
const AXIS_MAX = 2500
const TICKS = [2.5, 2.0, 1.5, 1.0, 0.5]

// Deterministic sample data — a seeded shape rather than Math.random(), so the
// server and client render identical markup and hydration stays clean.
const VALUES = Array.from({ length: MONTHS.length * BARS_PER_MONTH }, (_, i) => {
    const wave = Math.sin(i * 1.9) * 0.28 + Math.sin(i * 0.37) * 0.22 + Math.sin(i * 0.11) * 0.12
    return Math.round(1500 + wave * 900)
})

// The highlighted stretch in the reference — one month, drawn in full-strength ink.
const SELECTED_MONTH = 6
const isSelected = (i: number) => Math.floor(i / BARS_PER_MONTH) === SELECTED_MONTH

export default function OverviewCard({ className }: { className?: string }) {
    const [hovered, setHovered] = useState<number | null>(null)
    const active = hovered ?? SELECTED_MONTH * BARS_PER_MONTH + 2

    return (
        <Card className={cn("flex flex-col gap-6", className)}>
            <header className="flex items-start justify-between gap-4">
                <h3 className="text-lg text-zinc-900">Overview</h3>

            </header>

            <p className="text-4xl font-semibold text-zinc-900">
                <Money amount={1842.56} />
            </p>

            <figure className="mt-2">
                <figcaption className="sr-only">
                    Monthly spending across the year, in thousands of dollars
                </figcaption>

                <div className="flex gap-3">
                    {/* Recessive axis — labels only, no gridlines. */}
                    <div className="flex h-56 flex-col justify-between text-xs text-zinc-400">
                        {TICKS.map((t) => (
                            <span key={t}>{t.toFixed(1)}k</span>
                        ))}
                    </div>

                    <div className="relative flex-1">
                        <div
                            className="flex h-56 items-end gap-[2px]"
                            onMouseLeave={() => setHovered(null)}
                        >
                            {VALUES.map((value, i) => (
                                <div
                                    key={i}
                                    className="flex h-full flex-1 items-end"
                                    onMouseEnter={() => setHovered(i)}
                                >
                                    <div
                                        style={{ height: `${(value / AXIS_MAX) * 100}%` }}
                                        className={cn(
                                            "w-full rounded-t-full transition-colors",
                                            isSelected(i) || hovered === i
                                                ? "bg-zinc-900"
                                                : "bg-zinc-200",
                                        )}
                                    />
                                </div>
                            ))}
                        </div>

                        <div
                            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-3"
                            style={{
                                left: `${((active + 0.5) / VALUES.length) * 100}%`,
                                bottom: `${(VALUES[active] / AXIS_MAX) * 100}%`,
                            }}
                        >
                            <div className="whitespace-nowrap rounded-2xl bg-zinc-900 px-4 py-3 text-white shadow-lg">
                                <span className="text-lg font-semibold">
                                    <Money amount={VALUES[active]} centsClassName="text-zinc-500" />
                                </span>
                                <span className="mt-1 block text-xs text-zinc-400">
                                    for {MONTHS[Math.floor(active / BARS_PER_MONTH)]} 2026
                                </span>
                            </div>
                        </div>

                        <div className="mt-3 flex text-xs text-zinc-400">
                            {MONTHS.map((m) => (
                                <span key={m} className="flex-1 text-center">
                                    {m}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </figure>
        </Card>
    )
}

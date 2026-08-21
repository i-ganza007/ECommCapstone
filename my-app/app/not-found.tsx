import { CircleArrowRight } from "lucide-react"
import { Anton } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

import Logo from "@/images/frontend_logo.png"
import BrushCross from "@/uicomps/BrushCross"

// Anton is the closest thing on Google Fonts to the ultra-condensed poster face
// in the reference. Loaded in this file rather than the root layout so the extra
// webfont only ships to people who actually hit a 404.
const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" })

const ORANGE = "#ee7540"

// Only routes that exist. Linking a 404 page at more missing pages would be a
// joke at the visitor's expense.
const NAV = [
    { label: "Dashboard", href: "/" },
    { label: "Products", href: "/productList" },
    { label: "Checkout", href: "/checkout" },
] as const

/**
 * Root 404. Next renders this both for `notFound()` inside a segment and for any
 * URL that matches no route at all, so it deliberately carries its own header
 * and full-bleed background instead of relying on a route-group layout — an
 * unmatched URL never reaches one.
 */
export default function NotFound() {
    return (
        <div
            className="flex min-h-screen flex-col text-black"
            style={{ backgroundColor: ORANGE }}
        >
            

            <main className="flex flex-1 flex-col ">
                {/* The SVGs are decorative duplicates of one another, so the real
                    heading is here once and the drawings stay out of the a11y tree. */}
                <h1 className="sr-only">Page not found</h1>

                <div className="relative">
                    {/* textLength + lengthAdjust is what pins the type to both edges at
                        every viewport width. Letting the browser size the text from a
                        vw font-size would leave a ragged right edge whenever the font
                        metrics moved — and the whole look rests on it bleeding out. */}
                    <svg
                        viewBox="0 0 1200 390"
                        className="hidden w-full lg:block"
                        aria-hidden
                    >
                        <text
                            x="0"
                            y="380"
                            fontSize="498"
                            textLength="1200"
                            lengthAdjust="spacingAndGlyphs"
                            fill="currentColor"
                            className={anton.className}
                        >
                            PAGE NOT FOUND
                        </text>
                    </svg>

                    {/* Narrow screens break to two lines. FOUND is set larger than
                        PAGE NOT on purpose: five characters have to reach the same
                        two edges eight do, so filling the width means a bigger size
                        rather than stretched glyphs. Sizes are picked so textLength
                        is close to a no-op and the letterforms stay undistorted. */}
                    <svg viewBox="0 0 600 481" className="w-full lg:hidden" aria-hidden>
                        {[
                            { text: "PAGE NOT", size: 220, y: 172 },
                            { text: "FOUND", size: 376, y: 471 },
                        ].map((line) => (
                            <text
                                key={line.text}
                                x="0"
                                y={line.y}
                                fontSize={line.size}
                                textLength="600"
                                lengthAdjust="spacingAndGlyphs"
                                fill="currentColor"
                                className={anton.className}
                            >
                                {line.text}
                            </text>
                        ))}
                    </svg>

                    {/* Sits below the optical centre of the type, hanging past the
                        baseline the way the painted mark does in the reference. */}
                    <BrushCross className="absolute top-1/2 left-1/2 w-[52%] -translate-x-1/2 -translate-y-[25%] lg:w-[28%]" />
                </div>

                <div className="mt-auto flex justify-end p-3.5">
                    <Link
                        href="/"
                        className="group flex w-full flex-col gap-3 bg-black px-4 py-3 text-white transition-colors hover:bg-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:w-[12.5rem]"
                    >
                        <CircleArrowRight
                            className="size-5 self-end transition-transform duration-200 group-hover:translate-x-1"
                            strokeWidth={1.5}
                            aria-hidden
                        />
                        <span className="text-[15px]">Go to homepage</span>
                    </Link>
                </div>
            </main>
        </div>
    )
}

const headerLinkClass =
    "rounded-xs outline-none transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"

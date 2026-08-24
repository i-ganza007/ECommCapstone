"use client"
import { Bell, UserRound } from "lucide-react"
import Link from 'next/link'
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Wordmark from "@/uicomps/Wordmark"


// Label and destination together: every one of these resolves to a route that
// exists, so a header link never lands on a 404.
const LINKS = [
    { label: "Home", href: "/" },
    { label: "Product List", href: "/productList" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Checkout", href: "/checkout" },
    { label: "Profile", href: "/profile" },
] as const


const navItem = "cursor-pointer rounded-full px-6 py-2.5 transition-colors"

export default function Navbar() {
    // The current route decides what is highlighted — click state would be lost
    // on reload and would light up a link the visitor never arrived at.
    const pathname = usePathname()

    return (
        <nav className="flex w-full items-center justify-between py-2">
            {/* Small on purpose: the header is not where the logo does its work. */}
            <Link
                href="/"
                className="rounded-xs text-white outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
                <Wordmark variant="inline" size="sm" />
            </Link>

            <ul className="hidden items-center gap-2 text-[15px] lg:flex">
                {LINKS.map((link) => {
                    const active =
                        link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)

                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                    navItem,
                                    active
                                        ? "bg-white/20 text-white"
                                        : "text-white/70 hover:bg-white/10 hover:text-white",
                                )}
                            >
                                {link.label}
                            </Link>
                        </li>
                    )
                })}
            </ul>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    aria-label="Notifications"
                    className="grid size-11 place-items-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                >
                    <Bell className="size-5" />
                </button>
                {/* The one control on this page that already meant "account" —
                    now it goes where the word says. */}
                <Link
                    href="/profile"
                    aria-label="Account"
                    className="grid size-11 place-items-center rounded-full bg-zinc-900 text-white transition-colors hover:bg-zinc-800"
                >
                    <UserRound className="size-5" />
                </Link>
            </div>
        </nav>
    )
}

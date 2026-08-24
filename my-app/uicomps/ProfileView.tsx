"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { parseIsoDate, yearsBetween } from "@/lib/date"
import { money } from "@/lib/money"
import { useCatalogStore } from "@/store/catalog"
import { selectIsSignedIn, useSessionStore } from "@/store/session"
import { selectCartCount, selectCartSubtotal, useCartStore } from "@/store/store"
import { useCartHydrated } from "@/store/useCartHydrated"
import { useCatalogHydrated } from "@/store/useCatalogHydrated"
import { useSessionHydrated } from "@/store/useSessionHydrated"

/**
 * Everything here is read out of localStorage, so every section waits for its
 * own store to load before it says anything. A profile page that flashes
 * "signed out" at someone who is signed in is worse than one that takes a beat.
 */
export default function ProfileView() {
    const router = useRouter()

    const sessionReady = useSessionHydrated()
    const signedIn = useSessionStore(selectIsSignedIn)
    const email = useSessionStore((state) => state.email)
    const profile = useSessionStore((state) => state.profile)
    const signOut = useSessionStore((state) => state.signOut)

    if (!sessionReady) {
        return (
            <Shell>
                <p className="px-8 py-20 text-center text-sm text-brand/60">
                    Loading your profile…
                </p>
            </Shell>
        )
    }

    if (!signedIn) {
        return (
            <Shell>
                <div className="flex flex-col items-center gap-5 px-8 py-20 text-center">
                    <p className="font-serif text-xl italic">you are not signed in</p>
                    <p className="max-w-sm text-sm leading-relaxed text-brand/70">
                        Sign in to see your details, or create an account and this page
                        fills itself in.
                    </p>
                    <div className="mt-2 flex flex-wrap justify-center gap-3">
                        <Link
                            href="/login"
                            className="rounded-full bg-brand px-6 py-2.5 text-sm text-paper transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/signup"
                            className="rounded-full border border-hairline px-6 py-2.5 text-sm transition-colors hover:bg-hairline/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                        >
                            Create an account
                        </Link>
                    </div>
                </div>
            </Shell>
        )
    }

    const birthday = profile ? parseIsoDate(profile.dob) : undefined
    const age = birthday ? yearsBetween(birthday, new Date()) : undefined

    const fullName = profile
        ? `${profile.firstName} ${profile.lastName}`.trim()
        : undefined

    return (
        <Shell>
            <section className="border-b border-hairline px-8 py-10 lg:px-12">
                <h2 className="text-[11px] uppercase tracking-[0.2em] text-brand/60">
                    your details
                </h2>

                <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-hairline sm:grid-cols-2">
                    <Detail label="Name" value={fullName} />
                    <Detail label="Email" value={email ?? undefined} />
                    <Detail
                        label="Date of birth"
                        value={
                            birthday
                                ? birthday.toLocaleDateString(undefined, {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                  })
                                : undefined
                        }
                    />
                    <Detail
                        label="Age"
                        value={age === undefined ? undefined : `${age}`}
                    />
                </dl>

                {/* Signing in only ever knows an email address. Saying so beats
                    showing four blank rows with no explanation. */}
                {!profile && (
                    <p className="mt-5 max-w-xl text-xs leading-relaxed text-brand/60">
                        Only your email is on record. Names and dates of birth are kept
                        from the sign-up form, in this browser — signing in on a new
                        device cannot recover them.
                    </p>
                )}
            </section>

            <BagSection />
            <CreatedSection />

            <section className="flex flex-wrap items-center justify-between gap-4 px-8 py-8 lg:px-12">
                <p className="max-w-md text-xs leading-relaxed text-brand/60">
                    Signing out clears these details from this browser. There is no
                    server holding a copy.
                </p>

                <button
                    type="button"
                    onClick={() => {
                        signOut()
                        router.push("/")
                    }}
                    className="rounded-full border border-hairline px-6 py-2.5 text-sm transition-colors hover:bg-hairline/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                    Sign out
                </button>
            </section>
        </Shell>
    )
}

function BagSection() {
    const hydrated = useCartHydrated()
    const count = useCartStore(selectCartCount)
    const subtotal = useCartStore(selectCartSubtotal)

    return (
        <section className="border-b border-hairline px-8 py-10 lg:px-12">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="text-[11px] uppercase tracking-[0.2em] text-brand/60">
                    your bag
                </h2>
                <Link
                    href="/checkout"
                    className="rounded-xs text-sm underline underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                    Go to checkout
                </Link>
            </div>

            {!hydrated ? (
                <p className="mt-6 text-sm text-brand/60">Loading your bag…</p>
            ) : count === 0 ? (
                <p className="mt-6 text-sm text-brand/70">Nothing in it yet.</p>
            ) : (
                <p className="mt-6 font-serif text-2xl">
                    {count === 1 ? "1 item" : `${count} items`} ·{" "}
                    <span className="italic">{money(subtotal)}</span>
                </p>
            )}
        </section>
    )
}

function CreatedSection() {
    const hydrated = useCatalogHydrated()
    const created = useCatalogStore((state) => state.created)
    const removeProduct = useCatalogStore((state) => state.removeProduct)

    return (
        <section className="border-b border-hairline px-8 py-10 lg:px-12">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="text-[11px] uppercase tracking-[0.2em] text-brand/60">
                    products you added
                </h2>
                <Link
                    href="/productList/new"
                    className="rounded-xs text-sm underline underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                    Add another
                </Link>
            </div>

            {!hydrated ? (
                <p className="mt-6 text-sm text-brand/60">Loading…</p>
            ) : created.length === 0 ? (
                <p className="mt-6 text-sm text-brand/70">
                    None yet. Anything you create lives in this browser only.
                </p>
            ) : (
                <ul className="mt-6 divide-y divide-hairline">
                    {created.map((product) => (
                        <li
                            key={product.sku}
                            className="flex flex-wrap items-center justify-between gap-4 py-4"
                        >
                            <div>
                                <Link
                                    href={`/productList/${product.sku}`}
                                    className="rounded-xs font-serif text-lg lowercase underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                                >
                                    {product.name}
                                </Link>
                                <p className="mt-1 text-xs text-brand/60">
                                    <span className="font-mono">{product.sku}</span> ·{" "}
                                    {product.category} ·{" "}
                                    {product.variants.length === 1
                                        ? "1 variant"
                                        : `${product.variants.length} variants`}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => removeProduct(product.sku!)}
                                className="rounded-full border border-hairline px-4 py-2 text-sm transition-colors hover:bg-hairline/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

function Shell({ children }: { children: React.ReactNode }) {
    return (
        <main className="mt-8 overflow-hidden rounded-3xl border border-hairline bg-paper text-brand">
            <header className="border-b border-hairline px-8 py-10 lg:px-12">
                <h1 className="font-serif text-5xl lowercase lg:text-6xl">your profile</h1>
            </header>

            {children}
        </main>
    )
}

function Detail({ label, value }: { label: string; value?: string }) {
    return (
        <div className="bg-paper px-5 py-4">
            <dt className="text-xs text-brand/60">{label}</dt>
            <dd className="mt-1 text-sm">{value ?? "—"}</dd>
        </div>
    )
}

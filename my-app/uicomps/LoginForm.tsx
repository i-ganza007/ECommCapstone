"use client"

import * as React from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

function Sparkle({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden>
            <path
                d="M16 0c1 8.5 7.5 15 16 16-8.5 1-15 7.5-16 16-1-8.5-7.5-15-16-16C8.5 15 15 8.5 16 0Z"
                fill="currentColor"
            />
        </svg>
    )
}

function GoogleMark({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden>
            <path
                fill="#4285f4"
                d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17Z"
            />
            <path
                fill="#34a853"
                d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46Z"
            />
            <path
                fill="#fbbc05"
                d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7Z"
            />
            <path
                fill="#ea4335"
                d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07Z"
            />
        </svg>
    )
}

const fieldClass =
  
    "w-full border-b border-neutral-900 bg-transparent pb-3 text-[15px] text-neutral-900 outline-none placeholder:text-neutral-900 focus-visible:border-b-2 focus-visible:pb-[11px]"

export default function LoginForm() {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <div className="flex w-full max-w-md flex-col bg-white px-10 py-14 sm:px-16">
            <Sparkle className="mx-auto size-8 text-neutral-900" />

            <div className="mt-14 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
                    Welcome back!
                </h1>
                <p className="mt-3 text-[15px] text-neutral-800">Please enter your details</p>
            </div>

            <form
                className="mt-12 flex flex-col"
                onSubmit={(e) => e.preventDefault()}
            >
                <label htmlFor="login-email" className="sr-only">
                    Email
                </label>
                <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    className={fieldClass}
                />

                <label htmlFor="login-password" className="sr-only">
                    Password
                </label>
                <div className="relative mt-9">
                    <input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Password"
                        className={`${fieldClass} pr-10`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((shown) => !shown)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        className="absolute top-0 right-0 rounded-xs text-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
                    >
                        {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 text-[13px]">
                    <label className="flex items-center gap-2.5 text-neutral-900">
                        <input
                            type="checkbox"
                            name="remember"
                            className="size-4 accent-neutral-900"
                        />
                        Remember for 30 days
                    </label>
                    <Link
                        href="/forgot-password"
                        className="text-neutral-400 transition-colors hover:text-neutral-600"
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    className="mt-9 h-14 w-full rounded-full text-[15px] font-semibold"
                >
                    Log In
                </Button>

                <Button
                    type="button"
                    variant="secondary"
                    className="mt-4 h-14 w-full gap-3 rounded-full text-[15px] font-semibold"
                >
                    <GoogleMark className="size-5" />
                    Log in with Google
                </Button>
            </form>

            <p className="pt-14 text-center text-[13px] text-neutral-900">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-semibold hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    )
}

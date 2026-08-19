import type { Metadata } from "next"

import LoginForm from "@/uicomps/LoginForm"

export const metadata: Metadata = {
    title: "Log in",
    description: "Sign in to your account.",
}

// The (auth) layout owns the full viewport, the illustration half, and the
// centring — the page contributes only the card that goes in the right half.
export default function LoginPage() {
    return <LoginForm />
}

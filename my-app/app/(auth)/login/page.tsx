import type { Metadata } from "next"

import LoginForm from "@/uicomps/LoginForm"

export const metadata: Metadata = {
    title: "Log in",
    description: "Sign in to your account.",
}


export default function LoginPage() {
    return <LoginForm />
}

import type { Metadata } from "next"

import SignupForm from "@/uicomps/SignupForm"

export const metadata: Metadata = {
    title: "Create an account",
    description: "Open an account to check out faster.",
}

export default function SignupPage() {
    return <SignupForm />
}

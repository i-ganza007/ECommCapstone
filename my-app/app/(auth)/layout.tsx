import LoginIllustration from "@/uicomps/LoginIllustration"
import React from "react"


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen w-full items-center justify-center gap-12 px-6 lg:gap-24 lg:px-12">
          
            <div className="hidden flex-1 items-center justify-center lg:flex">
                <LoginIllustration className="w-full max-w-[620px]" />
            </div>

            <div className="flex w-full flex-1 items-center justify-center">
                {children}
            </div>
        </main>
    )
}

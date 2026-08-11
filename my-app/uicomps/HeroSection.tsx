import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react"

const heroButton =
    "flex items-center justify-center gap-2.5 rounded-full bg-white px-10 py-4 text-[15px] font-medium text-zinc-900 transition-colors hover:bg-zinc-100"

export default function HeroSection() {
    return (
        <div className="flex flex-col items-start gap-6">
            <h2 className="text-white/80 text-base">
                Expand your creativity, Grow your cart &amp; Share your experiences
            </h2>

            <h1 className="text-5xl font-semibold tracking-tight text-white lg:text-7xl">
                Welcome Back, Ian!
            </h1>

        </div>
    )
}

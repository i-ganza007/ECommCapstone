import { Coffee, Dumbbell, ShoppingCart, Shirt } from "lucide-react"
import NavBar from "@/uicomps/Navbar"
import HeroSection from "@/uicomps/HeroSection"
import OverviewCard from "@/uicomps/OverviewCard"
import StatCard from "@/uicomps/StatCard"
import RecentTransactions from "@/uicomps/RecentTransactions"
import InvestmentPerformance from "@/uicomps/InvestmentPerformance"

const CATEGORIES = [
    { label: "In Stock", icon: ShoppingCart, amount: 604.36, delta: 2.46 },
    { label: "Low Stock", icon: Shirt, amount: 296.65, delta: -1.84 },
    { label: "Out of Stock", icon: Coffee, amount: 206.48, delta: -2.62 },
    { label: "Drafted Products", icon: Dumbbell, amount: 182.44, delta: 0.83 },
]

export default function Dashboard() {
    return (
        // One container owns the page margin; nothing inside re-declares px.
        <div className="min-h-screen w-full bg-linear-to-b/oklab from-[#6E0B0B] from-5% via-[#D8400A] via-45% to-[#F3B45E] px-10 py-6">
            <NavBar />

            <div className="grid items-end gap-12 pb-14 pt-8 lg:grid-cols-[1fr_auto]">
                <HeroSection />
            </div>

            <main className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                <OverviewCard className="md:col-span-2 xl:row-span-2" />

                {CATEGORIES.map((c) => (
                    <StatCard key={c.label} {...c} />
                ))}

                <RecentTransactions className="md:col-span-2" />
                <InvestmentPerformance className="md:col-span-2" />
            </main>
        </div>
    )
}

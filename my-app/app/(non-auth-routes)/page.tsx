import type { Metadata } from "next"

import { BRAND } from "@/data/home"
import HomeHero from "@/uicomps/home/HomeHero"
import HomeStatement from "@/uicomps/home/HomeStatement"
import FeaturedProducts from "@/uicomps/home/FeaturedProducts"
import WhyUs from "@/uicomps/home/WhyUs"
import JournalSection from "@/uicomps/home/JournalSection"
import TalkToUs from "@/uicomps/home/TalkToUs"
import SiteFooter from "@/uicomps/home/SiteFooter"

export const metadata: Metadata = {
    title: BRAND.name,
    description: "A short, deliberate range of skincare. Twelve products, no filler.",
}

/**
 * The landing page is only an order of sections — each one owns its own layout
 * and pulls its own copy from data/home.ts, so reordering the page is a matter
 * of moving a line here.
 */
export default function Home() {
    return (
        <div className="pb-8">
            <HomeHero />
            <HomeStatement />
            <FeaturedProducts />
            <WhyUs />
            <JournalSection />
            <TalkToUs />
            <SiteFooter />
        </div>
    )
}

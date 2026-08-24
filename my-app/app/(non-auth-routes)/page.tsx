import type { Metadata } from "next"

import { BRAND } from "@/data/home"
import HomeHero from "@/uicomps/home/HomeHero"
import HomeStatement from "@/uicomps/home/HomeStatement"
import IntroduceUs from "@/uicomps/home/IntroduceUs"
import OfferingsDirectory from "@/uicomps/home/OfferingsDirectory"
import SocialProof from "@/uicomps/home/SocialProof"
import Extras from "@/uicomps/home/Extras"
import SiteFooter from "@/uicomps/home/SiteFooter"

export const metadata: Metadata = {
    title: BRAND.name,
    description: "A short, deliberate range of skincare. Twelve products, no filler.",
}

export default function Home() {
    return (
        <div className="pb-8">
            <HomeHero />
            <HomeStatement />
            <IntroduceUs />
            <OfferingsDirectory />
            <SocialProof />
            <Extras />
            <SiteFooter />
        </div>
    )
}

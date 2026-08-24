import { HERO } from "@/data/home"
import Panel from "@/uicomps/home/Panel"
import PillLink from "@/uicomps/home/PillLink"
import { eyebrowClass } from "@/uicomps/home/SectionHeading"

/**
 * Soft banded curves behind the headline. There are no photographs in the
 * project, so the hero "image" is drawn rather than loaded — it costs no
 * request and it cannot arrive after the text it sits behind.
 */
function HeroWaves() {
    return (
        <svg
            aria-hidden
            viewBox="0 0 1200 600"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
        >
            <path d="M0 380 C 300 250 700 470 1200 320 L1200 600 L0 600 Z" fill="currentColor" opacity="0.07" />
            <path d="M0 470 C 350 350 800 540 1200 410 L1200 600 L0 600 Z" fill="currentColor" opacity="0.07" />
            <path d="M0 190 C 260 120 620 240 1200 150" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.18" />
        </svg>
    )
}

export default function HomeHero() {
    return (
        <Panel tone="brand" className="relative">
            <HeroWaves />

            {/* min-h keeps the headline and the button inside the first screen on
                a laptop; the panel still grows if the copy is edited longer. */}
            <div className="relative grid min-h-[66vh] place-items-center px-8 py-20 text-center lg:px-12">
                <div className="max-w-3xl">
                    <p className={eyebrowClass}>{HERO.eyebrow}</p>

                    {/* The only h1 on the page. SectionHeading renders h2s, so the
                        hero writes its own rather than bending that component. */}
                    <h1 className="mt-6 font-serif text-5xl leading-[0.95] lowercase lg:text-7xl">
                        {HERO.headline}
                    </h1>

                    <p className="mx-auto mt-8 max-w-xl leading-relaxed opacity-90 lg:text-lg">
                        {HERO.welcome}
                    </p>

                    {/* One button. Anything else here competes with it. */}
                    <PillLink
                        href={HERO.cta.href}
                        variant="onBrand"
                        className="mt-10 px-8 py-3 text-base"
                    >
                        {HERO.cta.label}
                    </PillLink>
                </div>
            </div>
        </Panel>
    )
}

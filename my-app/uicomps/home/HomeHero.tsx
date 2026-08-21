import { BRAND, INTENTS } from "@/data/home"
import LoginIllustration from "@/uicomps/LoginIllustration"
import Panel from "@/uicomps/home/Panel"
import PillLink from "@/uicomps/home/PillLink"
import { eyebrowClass } from "@/uicomps/home/SectionHeading"

export default function HomeHero() {
    return (
        <Panel tone="brand">
            <div className="grid items-center gap-10 px-8 py-12 lg:grid-cols-[1.15fr_1fr] lg:px-12 lg:py-16">
                <div>
                    <p className={eyebrowClass}>welcome to {BRAND.name}</p>

                    {/* The only h1 on the page. SectionHeading renders h2s, so the
                        hero writes its own rather than bending that component. */}
                    <h1 className="mt-6 font-serif text-5xl leading-[0.95] lowercase lg:text-7xl">
                        skincare that earns its place on your shelf
                    </h1>

                    <div className="mt-10">
                        <p className={eyebrowClass}>how can we help?</p>
                        <ul className="mt-4 flex flex-wrap gap-2.5">
                            {INTENTS.map((intent) => (
                                <li key={intent.href}>
                                    <PillLink href={intent.href} variant="onBrand">
                                        {intent.label}
                                    </PillLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Reusing the sign-in illustration: it already carries the app's
                    voice, and its eyes follow the cursor, which does the job the
                    reference's animated hand does. */}
                <div className="flex justify-center lg:justify-end">
                    <LoginIllustration className="w-full max-w-sm" />
                </div>
            </div>
        </Panel>
    )
}

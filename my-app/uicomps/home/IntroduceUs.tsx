import { INTRO } from "@/data/home"
import LoginIllustration from "@/uicomps/LoginIllustration"
import Panel from "@/uicomps/home/Panel"
import PillLink from "@/uicomps/home/PillLink"
import { eyebrowClass } from "@/uicomps/home/SectionHeading"

/**
 * Image on the left, introduction on the right — the block that tells a visitor
 * who is behind the shop before it starts selling to them.
 *
 * The image slot reuses the sign-in illustration: it already carries the app's
 * voice, its eyes follow the cursor, and it is the only artwork the project
 * owns. Swap it for a photograph when there is one.
 */
export default function IntroduceUs() {
    return (
        <Panel tone="pink">
            <div className="grid items-center gap-12 px-8 py-14 lg:grid-cols-2 lg:px-12 lg:py-16">
                <div className="grid place-items-center rounded-2xl bg-paper/70 p-8">
                    <LoginIllustration className="w-full max-w-sm" />
                </div>

                <div>
                    <p className={eyebrowClass}>{INTRO.eyebrow}</p>

                    <h2 className="mt-4 font-serif text-4xl leading-tight lowercase lg:text-5xl">
                        {INTRO.title}
                    </h2>

                    <p className="mt-6 max-w-md leading-relaxed text-brand/80">{INTRO.body}</p>

                    <PillLink href={INTRO.link.href} variant="onPink" className="mt-8">
                        {INTRO.link.label}
                    </PillLink>
                </div>
            </div>
        </Panel>
    )
}

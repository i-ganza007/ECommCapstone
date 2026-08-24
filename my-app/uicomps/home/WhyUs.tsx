import { BRAND, REASONS } from "@/data/home"
import Panel from "@/uicomps/home/Panel"
import PillLink from "@/uicomps/home/PillLink"
import SectionHeading from "@/uicomps/home/SectionHeading"
import ReasonRow from "@/uicomps/home/ReasonRow"

export default function WhyUs() {
    return (
        <Panel tone="pink">
            <SectionHeading
                eyebrow="our expertise"
                title={`${BRAND.name}, for a dozen good reasons`}
                size="md"
                className="px-8 py-14 lg:px-12"
            />

            {/* Rules are brand-tinted rather than hairline here: on the pink slab
                a hairline rule is the same colour as the background. */}
            <div className="divide-y divide-brand/15 border-t border-brand/15">
                {REASONS.map((reason, index) => (
                    <ReasonRow key={reason.title} index={index} {...reason} />
                ))}
            </div>

            <div className="flex justify-center px-8 pt-12 pb-12">
                <PillLink href="/productList" variant="onPink">
                    Browse the full range
                </PillLink>
            </div>
        </Panel>
    )
}

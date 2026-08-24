import { PROBLEM } from "@/data/home"
import Panel from "@/uicomps/home/Panel"
import SectionHeading from "@/uicomps/home/SectionHeading"

/**
 * The first section below the fold. It names the problem the visitor arrived
 * with before the page says anything else about us — centred and narrow, so it
 * reads as a statement rather than a column of marketing.
 */
export default function HomeStatement() {
    return (
        <Panel className="px-8 py-16 text-center lg:px-12 lg:py-20">
            <SectionHeading
                eyebrow={PROBLEM.eyebrow}
                title={PROBLEM.subheading}
                size="md"
            />

            <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-brand/80">
                {PROBLEM.body}
            </p>
        </Panel>
    )
}

import Panel from "@/uicomps/home/Panel"
import PillLink from "@/uicomps/home/PillLink"
import SectionHeading from "@/uicomps/home/SectionHeading"

/**
 * The reference closes on a big "Let's talk!" panel. There is no contact form in
 * this app, so the same slot points at the two things a new visitor can do.
 */
export default function TalkToUs() {
    return (
        <Panel className="px-8 py-16 lg:px-12">
            <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
                <SectionHeading
                    eyebrow="new here?"
                    title="start with the essentials"
                    align="left"
                />

                <div className="flex flex-wrap gap-3">
                    <PillLink href="/productList" variant="solid">
                        Shop the range
                    </PillLink>
                    <PillLink href="/signup">Create an account</PillLink>
                </div>
            </div>
        </Panel>
    )
}

import { JOURNAL } from "@/data/home"
import Panel from "@/uicomps/home/Panel"
import SectionHeading from "@/uicomps/home/SectionHeading"
import JournalCard from "@/uicomps/home/JournalCard"

export default function JournalSection() {
    return (
        <Panel className="px-8 py-12 lg:px-12">
            <SectionHeading eyebrow="notes" title="from the journal" size="md" />

            <ul className="mt-12 grid gap-5 md:grid-cols-3">
                {JOURNAL.map((entry) => (
                    <JournalCard key={entry.title} {...entry} />
                ))}
            </ul>
        </Panel>
    )
}

import { JOURNAL, LEAD_MAGNET } from "@/data/home"
import Panel from "@/uicomps/home/Panel"
import PillLink from "@/uicomps/home/PillLink"
import SectionHeading from "@/uicomps/home/SectionHeading"
import JournalCard from "@/uicomps/home/JournalCard"

/**
 * The extras band: a lead magnet, then the journal.
 *
 * A newsletter form would normally sit here, but nothing in this app can
 * receive an email address — a field that silently discards one is worse than
 * not asking — so the slot offers something that exists instead.
 */
export default function Extras() {
    return (
        <Panel className="px-8 py-16 lg:px-12">
            <SectionHeading eyebrow="extras" title="before you buy anything" size="md" />

            <div className="mt-12 flex flex-col items-start justify-between gap-8 rounded-2xl bg-hairline/30 px-8 py-10 lg:flex-row lg:items-center lg:px-10">
                <div>
                    <h3 className="font-serif text-2xl lowercase">{LEAD_MAGNET.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand/80">
                        {LEAD_MAGNET.body}
                    </p>
                </div>

                <PillLink href={LEAD_MAGNET.link.href} variant="solid" className="shrink-0">
                    {LEAD_MAGNET.link.label}
                </PillLink>
            </div>

            <ul className="mt-10 grid gap-5 md:grid-cols-3">
                {JOURNAL.map((entry) => (
                    <JournalCard key={entry.title} {...entry} />
                ))}
            </ul>
        </Panel>
    )
}

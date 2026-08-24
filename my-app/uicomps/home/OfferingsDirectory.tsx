import { OFFERINGS } from "@/data/home"
import Panel from "@/uicomps/home/Panel"
import PillLink from "@/uicomps/home/PillLink"
import SectionHeading from "@/uicomps/home/SectionHeading"
import OfferingCard from "@/uicomps/home/OfferingCard"

/**
 * The offerings directory — three tiles a visitor scans instead of reading, each
 * one a door into the product list.
 */
export default function OfferingsDirectory() {
    return (
        <Panel className="px-8 py-16 lg:px-12">
            <SectionHeading eyebrow="what we make" title="the range, in three parts" size="md" />

            <ul className="mt-14 grid gap-10 md:grid-cols-3">
                {OFFERINGS.map((offering) => (
                    <OfferingCard key={offering.title} {...offering} />
                ))}
            </ul>

            <div className="mt-14 flex justify-center">
                <PillLink href="/productList">View all products</PillLink>
            </div>
        </Panel>
    )
}

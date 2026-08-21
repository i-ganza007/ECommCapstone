import Panel from "@/uicomps/home/Panel"
import { eyebrowClass } from "@/uicomps/home/SectionHeading"

/**
 * The plain-spoken paragraph the reference drops in immediately after its hero.
 * Set large and unstyled otherwise — it is the one place on the page reading
 * like a person rather than a layout.
 */
export default function HomeStatement() {
    return (
        <Panel className="px-8 py-14 lg:px-12">
            <p className={eyebrowClass}>our range</p>
            <p className="mt-8 max-w-4xl text-2xl leading-snug lg:text-4xl">
                Twelve products, no filler. Cleansers, serums, sunscreens and body care
                that do one job each and say plainly which job it is — so a routine can
                be three steps instead of nine.
            </p>
        </Panel>
    )
}

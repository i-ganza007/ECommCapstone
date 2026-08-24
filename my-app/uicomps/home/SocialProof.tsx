import { TESTIMONIALS } from "@/data/home"
import Panel from "@/uicomps/home/Panel"
import SectionHeading from "@/uicomps/home/SectionHeading"
import TestimonialCard from "@/uicomps/home/TestimonialCard"

/**
 * Customer reviews. On the pink slab so it reads as its own band between the
 * two paper sections either side of it.
 */
export default function SocialProof() {
    return (
        <Panel tone="pink" className="px-8 py-16 lg:px-12">
            <SectionHeading eyebrow="social proof" title="what customers say" size="md" />

            <ul className="mt-12 grid gap-5 md:grid-cols-3">
                {TESTIMONIALS.map((testimonial) => (
                    <TestimonialCard key={testimonial.name} {...testimonial} />
                ))}
            </ul>
        </Panel>
    )
}

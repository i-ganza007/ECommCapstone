import { FEATURED } from "@/data/products"
import Panel from "@/uicomps/home/Panel"
import PillLink from "@/uicomps/home/PillLink"
import SectionHeading from "@/uicomps/home/SectionHeading"
import FeaturedProductRow from "@/uicomps/home/FeaturedProductRow"

export default function FeaturedProducts() {
    return (
        <Panel>
            <SectionHeading
                eyebrow="our work"
                title="browse products"
                className="border-b border-hairline px-8 py-12"
            />

            <ul className="divide-y divide-hairline">
                {FEATURED.map((product, index) => (
                    <FeaturedProductRow key={product.sku} product={product} index={index} />
                ))}
            </ul>

            <div className="flex justify-center border-t border-hairline px-8 py-8">
                <PillLink href="/productList">View all products</PillLink>
            </div>
        </Panel>
    )
}

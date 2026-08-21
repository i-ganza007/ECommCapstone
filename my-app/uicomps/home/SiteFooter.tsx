import { BRAND, FOOTER_COLUMNS } from "@/data/home"
import FooterLinkColumn from "@/uicomps/home/FooterLinkColumn"

export default function SiteFooter() {
    return (
        // Not <Panel>: this is a <footer>, and Panel renders a <section>.
        <footer className="mt-8 overflow-hidden rounded-3xl border border-hairline bg-paper text-brand">
            <div className="grid gap-10 px-8 py-12 sm:grid-cols-2 lg:px-12">
                {FOOTER_COLUMNS.map((column) => (
                    <FooterLinkColumn key={column.heading} {...column} />
                ))}
            </div>

            {/* The reference signs off with its name broken into outlined blocks. */}
            <div className="grid gap-4 px-8 pb-10 sm:grid-cols-2 lg:px-12">
                {BRAND.blocks.map((block) => (
                    <p
                        key={block}
                        className="rounded-2xl border border-hairline px-8 py-10 text-center font-serif text-4xl lowercase lg:text-6xl"
                    >
                        {block}
                    </p>
                ))}
            </div>

            <p className="border-t border-hairline px-8 py-5 text-xs text-brand/60 lg:px-12">
                © {new Date().getFullYear()} {BRAND.name}
            </p>
        </footer>
    )
}

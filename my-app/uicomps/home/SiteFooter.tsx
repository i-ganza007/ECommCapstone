import { BRAND, FOOTER_CONNECT, FOOTER_QUICK_LINKS } from "@/data/home"
import FooterLinkColumn from "@/uicomps/home/FooterLinkColumn"
import Wordmark from "@/uicomps/Wordmark"
import { eyebrowClass } from "@/uicomps/home/SectionHeading"

export default function SiteFooter() {
    return (
        // Not <Panel>: this is a <footer>, and Panel renders a <section>.
        <footer className="mt-8 overflow-hidden rounded-3xl border border-hairline bg-paper text-brand">
            {/* Quick links left, name in the middle, contact details right. */}
            <div className="grid gap-12 px-8 py-14 lg:grid-cols-3 lg:px-12">
                <FooterLinkColumn {...FOOTER_QUICK_LINKS} />

                {/* The one place the full lockup is set large. */}
                <div className="flex items-center justify-center">
                    <Wordmark variant="stacked" size="xl" descriptor="skincare" />
                </div>

                <div className="space-y-8 lg:text-right">
                    {FOOTER_CONNECT.map((group) => (
                        <div key={group.heading}>
                            <p className={eyebrowClass}>{group.heading}</p>
                            <ul className="mt-4 space-y-1.5 text-sm">
                                {group.lines.map((line) => (
                                    <li key={line}>{line}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <p className="border-t border-hairline px-8 py-5 text-xs text-brand/60 lg:px-12">
                © {new Date().getFullYear()} {BRAND.name}
            </p>
        </footer>
    )
}

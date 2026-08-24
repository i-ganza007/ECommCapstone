import Link from "next/link"

import { eyebrowClass } from "@/uicomps/home/SectionHeading"

export default function FooterLinkColumn({
    heading,
    links,
}: {
    heading: string
    links: readonly { label: string; href: string }[]
}) {
    return (
        <div>
            <p className={eyebrowClass}>{heading}</p>
            <ul className="mt-5 space-y-2 text-sm">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className="rounded-xs hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

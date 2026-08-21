/**
 * Deliberately not a link: there is no journal to link to yet, and a card that
 * looks clickable and is not is worse than one that never offered.
 *
 * Colours arrive as values rather than classes because they come from the
 * illustration palette in data/home.ts, which Tailwind cannot see at build time.
 */
export default function JournalCard({
    title,
    note,
    background,
    color,
}: {
    title: string
    note: string
    background: string
    color: string
}) {
    return (
        <li
            className="flex min-h-56 flex-col justify-end rounded-2xl p-7"
            style={{ backgroundColor: background, color }}
        >
            <h3 className="font-serif text-2xl leading-tight">{title}</h3>
            <p className="mt-3 text-sm opacity-80">{note}</p>
        </li>
    )
}

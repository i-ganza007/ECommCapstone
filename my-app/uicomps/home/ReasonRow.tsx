export default function ReasonRow({
    index,
    title,
    body,
    tags,
}: {
    index: number
    title: string
    body: string
    tags: readonly string[]
}) {
    return (
        <article className="grid gap-6 px-8 py-10 lg:grid-cols-[3rem_1fr_14rem] lg:px-12">
            {/* Zero-padded counter, as the reference numbers its expertise rows. */}
            <p className="font-serif text-sm">{String(index + 1).padStart(2, "0")}</p>

            <div>
                <h3 className="text-xl lg:text-2xl">{title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand/80">{body}</p>
            </div>

            <ul className="space-y-1.5 text-sm text-brand/70 lg:text-right">
                {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                ))}
            </ul>
        </article>
    )
}

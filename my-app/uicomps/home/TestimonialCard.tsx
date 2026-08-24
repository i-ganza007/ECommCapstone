import { Rating } from "@/uicomps/ProductCard"

export default function TestimonialCard({
    quote,
    name,
    detail,
    rating,
}: {
    quote: string
    name: string
    detail: string
    rating: number
}) {
    return (
        <li className="flex flex-col rounded-2xl bg-paper p-8">
            <div className="flex items-center gap-2 text-xs">
                <Rating rating={rating} />
                {/* The marks are decorative, so the score is stated as well. */}
                <span>{rating} out of 5</span>
            </div>

            <blockquote className="mt-6 grow font-serif text-lg leading-snug italic">
                “{quote}”
            </blockquote>

            <footer className="mt-6 text-sm">
                <p>{name}</p>
                <p className="mt-1 text-brand/60">{detail}</p>
            </footer>
        </li>
    )
}

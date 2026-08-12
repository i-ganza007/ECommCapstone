import Image from "next/image"

export type Product = {
    name: string
    price: number
    rating: number
    reviews: number
    isNew?: boolean
    /** Path under /public, e.g. "/products/serum.png". Falls back to a placeholder. */
    image?: string
}

// Small rotated squares, the way the reference draws its rating marks.
function Rating({ rating }: { rating: number }) {
    return (
        <span className="flex items-center gap-1" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
                <span
                    key={i}
                    className={`size-1.5 rotate-45 ${
                        i < rating ? "bg-brand" : "bg-brand/25"
                    }`}
                />
            ))}
        </span>
    )
}

export default function ProductCard({ name, price, rating, reviews, isNew, image }: Product) {
    return (
        <article className="group flex flex-col items-center gap-2 px-6 py-8 text-brand">
            <div className="flex items-center gap-2 text-xs">
                <Rating rating={rating} />
                {/* The rating is also stated in text, never shape-only. */}
                <span>
                    <span className="sr-only">{rating} out of 5 stars, </span>
                    {reviews} reviews
                </span>
            </div>

            <p className="h-5 font-serif text-xs italic">{isNew ? "new arrival" : ""}</p>

            <div className="relative my-4 grid h-56 w-full place-items-center">
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    // Placeholder silhouette until real product photography exists.
                    <div className="h-44 w-16 rounded-t-2xl rounded-b bg-linear-to-b from-zinc-200 to-zinc-300 transition-transform duration-300 group-hover:scale-105" />
                )}
            </div>

            <h2 className="text-center font-serif text-[15px]">{name}</h2>
            <p className="font-serif text-sm italic">${price.toFixed(2)} eur</p>
        </article>
    )
}

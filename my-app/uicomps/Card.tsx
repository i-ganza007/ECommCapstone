import { cn } from "@/lib/utils"

// The white rounded panel every dashboard tile sits on.
export default function Card({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <section className={cn("rounded-3xl bg-white p-6", className)}>
            {children}
        </section>
    )
}

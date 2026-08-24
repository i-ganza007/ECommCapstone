import Wordmark from "@/uicomps/Wordmark"

/**
 * Root loading state. It replaces everything below the root layout — including
 * the header — so the mark is set here too, otherwise the one moment a visitor
 * is definitely looking at the screen is the one moment the name is missing.
 *
 * On the plain body background, so it takes the brand coral.
 */
export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-10 text-brand">
            <Wordmark variant="stacked" size="lg" descriptor="skincare" />

            <div className="loader" role="status" aria-label="Loading" />
        </div>
    )
}

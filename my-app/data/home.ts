// Content for the landing page, kept away from the components that render it so
// copy can be edited without reading any JSX.

/**
 * PLACEHOLDER: nothing in the project names the shop, so this is invented.
 * It is the single source for the hero, the footer blocks and the page title.
 */
export const BRAND = {
    name: "Maison Coral",
    blocks: ["Maison", "Coral"],
} as const

/**
 * Hero shortcuts. Every href resolves to a route that exists — a landing page
 * whose buttons 404 is worse than a landing page with fewer buttons.
 */
export const INTENTS = [
    { label: "Show me everything", href: "/productList" },
    { label: "What's in my bag?", href: "/checkout" },
    { label: "I'm new here", href: "/signup" },
    { label: "I already have an account", href: "/login" },
] as const

/**
 * Grounded in what the app actually does rather than invented marketing claims —
 * every one of these is visible in the product grid or the detail panel.
 */
export const REASONS = [
    {
        title: "Every formula, fully listed",
        body: "Open any product and the panel gives you texture, skin type, key ingredient and size before you commit. No decoding a label in a shop aisle.",
        tags: ["Key ingredient", "Texture", "Skin type"],
    },
    {
        title: "Stock you can actually see",
        body: "Unit counts are on the page. If something is down to its last few, you will know before it is in your bag — and sold out never hides behind an add button.",
        tags: ["Live counts", "Honest sold-out"],
    },
    {
        title: "Rated by people who bought it",
        body: "Ratings sit next to the price on every card, stated in text as well as marks, so the number is never something you have to squint at.",
        tags: ["Ratings", "Reviews"],
    },
] as const

/**
 * PLACEHOLDER copy — swap for real editorial when there is any. Colours are
 * borrowed from the sign-in illustration so the page stays one family.
 */
export const JOURNAL = [
    {
        title: "How to layer without pilling",
        note: "Thin to thick, and wait between steps.",
        background: "#e7d302",
        color: "#1d1d21",
    },
    {
        title: "Sunscreen is the whole routine",
        note: "The one step that outperforms everything else.",
        background: "#5a22f0",
        color: "#faf8f6",
    },
    {
        title: "What niacinamide actually does",
        note: "Barrier repair, in plain language.",
        background: "#f98336",
        color: "#1d1d21",
    },
] as const

export const FOOTER_COLUMNS = [
    {
        heading: "also on this site",
        links: [
            { label: "All products", href: "/productList" },
            { label: "Checkout", href: "/checkout" },
            { label: "Dashboard", href: "/dashboard" },
        ],
    },
    {
        heading: "your account",
        links: [
            { label: "Log in", href: "/login" },
            { label: "Create an account", href: "/signup" },
        ],
    },
] as const

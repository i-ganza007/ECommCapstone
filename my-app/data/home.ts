// Content for the landing page, kept away from the components that render it so
// copy can be edited without reading any JSX.
//
// The section order below mirrors the page: hero → problem → introduction →
// offerings → social proof → extras → footer.

/**
 * PLACEHOLDER: nothing in the project names the shop, so this is invented.
 * It is the single source for the hero, the footer blocks and the page title.
 */
export const BRAND = {
    name: "Maison Coral",
    blocks: ["Maison", "Coral"],
} as const

/**
 * Above the fold. One headline, one supporting sentence, one button — the
 * single most important thing a first-time visitor can do is browse the range,
 * so nothing else competes with it up here.
 */
export const HERO = {
    eyebrow: `welcome to ${BRAND.name}`,
    headline: "skincare that earns its place on your shelf",
    welcome:
        "Twelve products, no filler. Every formula lists what it does, what is in it and who it suits — before you buy, not after.",
    cta: { label: "Shop the range", href: "/productList" },
} as const

/**
 * The first thing below the fold: name the problem the visitor arrived with,
 * rather than opening with another claim about ourselves.
 */
export const PROBLEM = {
    eyebrow: "why this exists",
    subheading: "a shelf full of products, and still no routine",
    body: "Most skincare is sold on a label you cannot read in a shop aisle and reviews you cannot trust. So people buy nine products, use three, and never find out which one was working. We publish the texture, the skin type, the key ingredient, the size and the stock count on every product page — the same details you would ask a pharmacist for.",
} as const

/**
 * "Introduce yourself" — who we are, paired with an image. There is no /about
 * route in this app, so the button points at the range instead of a 404.
 */
export const INTRO = {
    eyebrow: "who we are",
    title: "a small range, chosen on purpose",
    body: "We are a twelve-product house, not a catalogue. Each formula has one job, is priced in plain sight and stays on the shelf only while it is the best thing we can make for that job. If a product cannot explain itself in one line, it does not ship.",
    link: { label: "See the full range", href: "/productList" },
} as const

/**
 * The offerings directory — the "visual menu" a visitor scans instead of
 * reading. Each entry borrows a real product from the catalogue for its image,
 * so the tiles are never further out of date than the shop itself.
 */
export const OFFERINGS = [
    {
        title: "Serums",
        blurb: "Targeted actives for congestion, texture and dullness.",
        sku: "SER-PM-30",
        href: "/productList",
    },
    {
        title: "Daily care",
        blurb: "Cleansers and creams mild enough for every morning.",
        sku: "CRM-HS-50",
        href: "/productList",
    },
    {
        title: "Sun & body",
        blurb: "Broad-spectrum protection and barrier repair, head to toe.",
        sku: "SUN-BL-200",
        href: "/productList",
    },
] as const

/**
 * PLACEHOLDER reviews — swap for real ones before this goes anywhere near a
 * customer. Ratings shown are the ones already recorded against each product.
 */
export const TESTIMONIALS = [
    {
        quote: "The first serum I have finished the whole bottle of. It says lightweight fluid on the page and that is exactly what it is.",
        name: "Ama O.",
        detail: "on the Pore Minimizing Serum",
        rating: 5,
    },
    {
        quote: "Being able to see the stock count changed how I shop. I stopped hoarding and started reordering when it actually mattered.",
        name: "Daniel K.",
        detail: "on the Deep Cleansing Mask",
        rating: 5,
    },
    {
        quote: "Fragrance-free, and it says so before the ingredients list. My skin flushes at everything and this one has not set it off.",
        name: "Priya S.",
        detail: "on the Daily Hydra Cream — Sensitive",
        rating: 5,
    },
] as const

/**
 * The lead magnet in the extras band. Deliberately a link to something that
 * exists rather than an email capture — there is no backend to receive one,
 * and a form that quietly discards an address is worse than no form.
 */
export const LEAD_MAGNET = {
    title: "the three-step routine",
    body: "Cleanse, treat, protect. A one-page starting point built from the range, with the order to layer things in and how long to wait between steps.",
    link: { label: "Start with the essentials", href: "/productList" },
} as const

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

/** Footer, left column. Every href resolves to a route that exists. */
export const FOOTER_QUICK_LINKS = {
    heading: "quick links",
    links: [
        { label: "All products", href: "/productList" },
        { label: "Checkout", href: "/checkout" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Log in", href: "/login" },
        { label: "Create an account", href: "/signup" },
    ],
} as const

/**
 * Footer, right column. PLACEHOLDER details — plain text rather than links,
 * because none of these destinations exist yet.
 */
export const FOOTER_CONNECT = [
    { heading: "social media", lines: ["Instagram", "Pinterest"] },
    { heading: "contact", lines: ["hello@maisoncoral.example", "+44 20 7946 0000"] },
    { heading: "location", lines: ["12 Bell Lane", "London E1 7LA"] },
] as const

/**
 * Kept for the sections that are no longer in the landing page's running order
 * (WhyUs, HomeHero's old intent pills) so those components still compile.
 */
export const INTENTS = [
    { label: "Show me everything", href: "/productList" },
    { label: "What's in my bag?", href: "/checkout" },
    { label: "I'm new here", href: "/signup" },
    { label: "I already have an account", href: "/login" },
] as const

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

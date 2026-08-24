/** The one place prices get formatted, so every surface quotes them the same. */

/** Inserts a comma every three digits, without touching a leading minus sign. */
const THOUSANDS = /\B(?=(\d{3})+(?!\d))/g

export const CURRENCY_CODE = "RWF"

/**
 * The Rwandan franc has no minor unit in practice, so amounts are shown as
 * whole francs — there are no centimes to print.
 *
 * Grouped by hand rather than through `Intl`/`toLocaleString`: those depend on
 * the ICU data of whichever runtime formats them, and a price rendered on the
 * server has to match the one React renders in the browser exactly or hydration
 * complains.
 */
export function formatAmount(value: number): string {
    return Math.round(value).toString().replace(THOUSANDS, ",")
}

/** "RWF 98,600" — the full form, for anywhere quoting a price in running text. */
export const money = (value: number) => `${CURRENCY_CODE} ${formatAmount(value)}`

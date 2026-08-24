/**
 * Calendar-day helpers for the sign-up form.
 *
 * Everything here works in local time on purpose. `new Date("1998-04-23")` is
 * parsed as UTC, which lands on the previous day for anyone west of Greenwich —
 * a birthday is a calendar day, not an instant, so the parts are handled
 * directly instead.
 */

/** A date as `YYYY-MM-DD`, the value the date input holds. */
export function toIsoDate(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${date.getFullYear()}-${month}-${day}`
}

/**
 * Parses `YYYY-MM-DD`, returning undefined for anything malformed or for a day
 * that does not exist — "2025-02-31" would otherwise roll forward into March.
 */
export function parseIsoDate(value: string): Date | undefined {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim())
    if (!match) return undefined

    const [, year, month, day] = match.map(Number)
    const date = new Date(year, month - 1, day)

    const rolled =
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day

    return rolled ? undefined : date
}

/** Whole years between two calendar days, counting a birthday as reached on the day. */
export function yearsBetween(from: Date, to: Date): number {
    let years = to.getFullYear() - from.getFullYear()

    const beforeBirthday =
        to.getMonth() < from.getMonth() ||
        (to.getMonth() === from.getMonth() && to.getDate() < from.getDate())

    if (beforeBirthday) years -= 1

    return years
}

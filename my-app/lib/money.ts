/** The one place prices get formatted, so every surface quotes them the same. */
export const money = (amount: number) => `$${amount.toFixed(2)} eur`

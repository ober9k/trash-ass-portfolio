export const Currency = {
  AUD: "aud",
  USD: "usd",
} as const;

export type Currency = typeof Currency[keyof typeof Currency];

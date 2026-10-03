import { Currency } from "@shared/types/currency.ts";

export const Defaults = {
  Currency: Currency.AUD.toString(),
  CurrencyPrecision: 2,
  PercentPrecision: 1,
  Locale: "en-AU",
} as const;

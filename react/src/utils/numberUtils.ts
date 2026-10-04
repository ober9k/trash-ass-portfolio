import { Defaults } from "@/config/defaults.ts";

function getNumberFormat(options: any): Intl.NumberFormat {
  return new Intl.NumberFormat(Defaults.Locale, options);
}

export function formatCurrency(value: number, currency: string = Defaults.Currency): string {
  const options = {
    style: "currency",
    currency: currency,
  };

  return getNumberFormat(options).format(value);
}

export function formatPercent(value: number, precision: number = Defaults.PercentPrecision): string {
  const options = {
    style: "percent",
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
    signDisplay: "exceptZero",
  };

  return getNumberFormat(options).format(value);
}

export function formatDate(date: Date): string {
  const formatter = new Intl.DateTimeFormat(Defaults.Locale, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return formatter.format(date);
}

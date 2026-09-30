export const Period = {
  OneHour:  "1h",
  OneDay:   "1d",
  OneWeek:  "1w",
  OneMonth: "1m",
  OneYear:  "1y",
  All:      "all",
} as const;

export type Period = typeof Period[keyof typeof Period];

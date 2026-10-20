import { Period } from "@shared/types/period";
import { z } from "zod";

const Periods = [Period.OneHour, Period.OneDay, Period.OneWeek, Period.OneMonth, Period.OneYear].map(_ => _.toString());

export const PeriodSearchSchema = z.object({
  period: z.enum(Periods).optional(),
});

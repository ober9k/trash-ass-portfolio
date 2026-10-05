import { z } from "zod";
import { Period } from "../../types/period";

const Periods = [Period.OneHour, Period.OneDay, Period.OneWeek, Period.OneMonth, Period.OneYear].map(_ => _.toString());

export const PeriodSearchSchema = z.object({
  period: z.enum(Periods).optional(),
});

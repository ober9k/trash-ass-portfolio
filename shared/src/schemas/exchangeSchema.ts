import { z } from "zod";

export const ExchangeSchema = z.object({
  name:    z.string().min(0),
  website: z.url().min(0),
});

export type ExchangeData = z.infer<typeof ExchangeSchema>;

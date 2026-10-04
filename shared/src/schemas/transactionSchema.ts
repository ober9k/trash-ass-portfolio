import { z } from "zod";

export const TransactionSchema = z.object({
  price:       z.number().min(0),
  quantity:    z.number().min(0),
  fee:         z.number().min(0),
  value:       z.number().min(0),
  purchasedAt: z.date(),
});

export type TransactionData = z.infer<typeof TransactionSchema>;

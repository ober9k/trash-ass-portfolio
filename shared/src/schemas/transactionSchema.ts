import { z } from "zod";
import { TransactionType } from "@shared/types/transactionType";

const TransactionTypes = [TransactionType.Buy, TransactionType.Sell, TransactionType.Yield, TransactionType.Transfer].map(_ => _.toString());
const TransactionTypeLabels = TransactionTypes.join(", ");

export const TransactionSchema = z.object({
  assetId:     z.string().regex(/^[a-zA-Z0-9_-]{20}$/).length(20),
  type:        z.enum(TransactionTypes, `Invalid option: expected one of ${TransactionTypeLabels}`),
  price:       z.number().min(0),
  quantity:    z.number().min(0),
  fee:         z.number().min(0),
  value:       z.number().min(0),
  purchasedAt: z.iso.datetime(),
});

export type TransactionData = z.infer<typeof TransactionSchema>;

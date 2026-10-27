import { TransactionType } from "@shared/types/transactionType";
import { idRegex } from "@shared/utils/schemaUtils";
import { z } from "zod";

const TransactionTypes = [TransactionType.Buy, TransactionType.Sell, TransactionType.Yield, TransactionType.Transfer].map(_ => _.toString());
const TransactionTypeLabels = TransactionTypes.join(", ");

export const TransactionSchema = z.object({
  assetId:     z.string().regex(idRegex).length(20),
  type:        z.enum(TransactionTypes, `Invalid option: expected one of ${TransactionTypeLabels}`),
  price:       z.number().min(0),
  quantity:    z.number().min(0),
  fee:         z.number().min(0),
  value:       z.number().min(0),
  purchasedAt: z.iso.datetime(),
});

type WithUserId = {
  userId: string,
};

export type TransactionData = z.infer<typeof TransactionSchema>;
export type UserTransactionData = TransactionData &  WithUserId;

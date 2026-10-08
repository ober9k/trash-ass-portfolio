import { buildApiUrl } from "@/api/utils";
import type { TransactionData } from "@shared/schemas/transactionSchema";
import type { Transaction } from "@shared/types/portfolio";
import axios from "axios";

export function buildAddTransactionFn(holdingId: string) {
  return async (data: TransactionData): Promise<Transaction> => {
    const result = await axios.post(buildApiUrl(["me", "portfolio", "holdings", holdingId.toLowerCase(), "transactions"]), data);
    return result.data as Transaction;
  }
}

export function buildUpdateTransactionFn(id: string) {
  return async (data: TransactionData): Promise<Transaction> => {
    const result = await axios.put(buildApiUrl(["me", "transactions", id]), data);
    return result.data as Transaction;
  }
}


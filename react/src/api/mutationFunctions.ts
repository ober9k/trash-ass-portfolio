import type { TransactionData } from "@shared/schemas/transactionSchema";
import type { Transaction } from "@shared/types/portfolio";
import axios from "axios";
import { buildApiUrl } from "./utils";

export function buildUpdateTransactionFn(id: string) {
  return async (data: TransactionData): Promise<Transaction> => {
    const result = await axios.put(buildApiUrl(["me", "transactions", id]), data);
    return result.data as Transaction;
  }
}


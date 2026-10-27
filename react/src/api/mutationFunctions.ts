import { getAuthConfig } from "@/api/queryFunctions.ts";
import { buildApiUrl } from "@/api/utils";
import type { TransactionData } from "@shared/schemas/transactionSchema";
import type { Transaction } from "@shared/types/portfolio";
import axios from "axios";

export function buildAddTransactionFn() {
  return async (data: TransactionData): Promise<Transaction> => {
    const result = await axios.post(buildApiUrl(["me", "transactions"]), data, await getAuthConfig());
    return result.data as Transaction;
  }
}

export function buildUpdateTransactionFn(holdingId: string, transactionId: string) {
  return async (data: TransactionData): Promise<Transaction> => {
    const result = await axios.put(buildApiUrl(["me", "transactions", transactionId]), data, await getAuthConfig());
    return result.data as Transaction;
  }
}


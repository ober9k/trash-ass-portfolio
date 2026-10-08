import type { FormState } from "@/types/formState.ts";
import type { TransactionData } from "@shared/schemas/transactionSchema.ts";

/**
 * Build based on `TransactionData`.
 */
export function buildInitialState(transaction?: TransactionData): FormState<TransactionData> {
  const fieldValues = (transaction)
    ? {
      type:     transaction.type,
      price:    transaction.price,
      quantity: transaction.quantity,
      fee:      transaction.fee,
      value:    transaction.value,
    } : {
      type:     "",
      price:    0,
      quantity: 0,
      fee:      0,
      value:    0,
    }

  return {
    fieldValues, fieldErrors: {}, formErrors: []
  };
}

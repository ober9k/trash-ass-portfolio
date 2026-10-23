import { schemaValidationHandler } from "@/middlewares/schemaValidationHandler";
import { ExchangeSchema } from "@shared/schemas/exchangeSchema";
import { TransactionSchema } from "@shared/schemas/transactionSchema";

export function validateExchangeSchema() {
  return schemaValidationHandler(ExchangeSchema);
}

export function transactionSchemaValidationHandler() {
  return schemaValidationHandler(TransactionSchema);
}

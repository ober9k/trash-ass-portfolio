import { schemaValidationHandler } from "@/middlewares/schemaValidationHandler";
import { TransactionSchema } from "@shared/schemas/transactionSchema";

export function transactionSchemaValidationHandler() {
  return schemaValidationHandler(TransactionSchema);
}

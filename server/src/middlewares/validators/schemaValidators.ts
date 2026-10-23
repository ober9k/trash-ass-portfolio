import { schemaValidationHandler } from "@/middlewares/schemaValidationHandler";
import { AssetSchema } from "@shared/schemas/assetSchema";
import { ExchangeSchema } from "@shared/schemas/exchangeSchema";
import { TransactionSchema } from "@shared/schemas/transactionSchema";

export function validateAssetSchema() {
  return schemaValidationHandler(AssetSchema);
}

export function validateExchangeSchema() {
  return schemaValidationHandler(ExchangeSchema);
}

export function transactionSchemaValidationHandler() {
  return schemaValidationHandler(TransactionSchema);
}

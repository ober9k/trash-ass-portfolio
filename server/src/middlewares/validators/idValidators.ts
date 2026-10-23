import { idValidationHandler } from "../idValidationHandler";

export function validateAssetId() {
  return idValidationHandler("assetId");
}

export function validateHoldingId() {
  return idValidationHandler("holdingId");
}

export function validateTransactionId() {
  return idValidationHandler("transactionId");
}

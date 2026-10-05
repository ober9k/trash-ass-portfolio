import { idValidationHandler } from "../idValidationHandler";

export function assetIdValidationHandler() {
  return idValidationHandler("assetId");
}

export function transactionIdValidationHandler() {
  return idValidationHandler("transactionId");
}

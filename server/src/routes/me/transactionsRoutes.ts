import { createTransaction, getTransaction, getTransactions, updateTransaction } from "@/controllers/transactionsController";
import { validateTransactionId } from "@/middlewares/validators/idValidators";
import { transactionSchemaValidationHandler } from "@/middlewares/validators/schemaValidators";
import { Router } from "express";

const router = Router()
  .get("", [], getTransactions)
  .get("/:transactionId", [validateTransactionId()], getTransaction)
  .post("", [transactionSchemaValidationHandler()], createTransaction)
  .put("/:transactionId", [validateTransactionId(), transactionSchemaValidationHandler()], updateTransaction);

export { router as transactionsRoutes };

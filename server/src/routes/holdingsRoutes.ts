import { createTransaction, getTransaction, getTransactions, updateTransaction } from "@/controllers/transactionsController";
import { authenticateToken } from "@/middlewares/authenticateToken";
import { validateHoldingId, validateTransactionId } from "@/middlewares/validators/idValidators";
import { transactionSchemaValidationHandler } from "@/middlewares/validators/schemaValidators";
import { Router } from "express";

const router = Router();

router.use(authenticateToken);

router.get("/:holdingId/transactions", [validateHoldingId()], getTransactions);

router.get("/:holdingId/transactions/:transactionId", [validateHoldingId(), validateTransactionId()], getTransaction);

router.post("/:holdingId/transactions", [validateHoldingId(), transactionSchemaValidationHandler()], createTransaction);

router.put("/:holdingId/transactions/:transactionId", [validateTransactionId(), transactionSchemaValidationHandler()], updateTransaction);

export { router as holdingsRoutes };

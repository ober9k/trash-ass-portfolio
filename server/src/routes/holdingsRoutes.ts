import { createTransaction, getTransaction, getTransactions, updateTransaction } from "@/controllers/transactionsController";
import { authenticateToken } from "@/middlewares/authenticateToken";
import { validateHoldingId, validateTransactionId } from "@/middlewares/validators/idValidators";
import { transactionSchemaValidationHandler } from "@/middlewares/validators/schemaValidators";
import { Router } from "express";

const router = Router();

router.use(authenticateToken);

router.get("", [validateHoldingId()], getTransactions);

router.get("/:transactionId", [validateTransactionId()], getTransaction);

router.post("", [transactionSchemaValidationHandler()], createTransaction);

router.put("/:transactionId", [validateTransactionId(), transactionSchemaValidationHandler()], updateTransaction);

export { router as holdingsRoutes };

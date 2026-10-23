import { createTransaction, getTransaction, getTransactions, updateTransaction } from "@/controllers/transactionsController";
import { getAccountId } from "@/helpers/user";
import { authenticateToken } from "@/middlewares/authenticateToken";
import { validateHoldingId, validateTransactionId } from "@/middlewares/validators/idValidators";
import { transactionSchemaValidationHandler } from "@/middlewares/validators/schemaValidators";
import { getHoldingByAccountIdAndAssetId } from "@/services";
import { type Request, type Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.use(authenticateToken);

router.get("/:holdingId", [validateHoldingId()], async (req: Request, res: Response) => {
  const accountId = getAccountId(req);
  const assetId = req.params["holdingId"] as string; /* mapped to `assetId` */

  return res.status(StatusCodes.OK).json(
    await getHoldingByAccountIdAndAssetId(accountId, assetId)
  );
});

router.get("/:holdingId/transactions", [validateHoldingId()], getTransactions);

router.get("/:holdingId/transactions/:transactionId", [validateHoldingId(), validateTransactionId()], getTransaction);

router.post("/:holdingId/transactions", [validateHoldingId(), transactionSchemaValidationHandler()], createTransaction);

router.put("/:holdingId/transactions/:transactionId", [validateTransactionId(), transactionSchemaValidationHandler()], updateTransaction);

export { router as holdingsRoutes };

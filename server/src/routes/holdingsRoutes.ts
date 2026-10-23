import { refreshSummaryData } from "@/apis/summaries";
import { addTransaction, fetchTransactionById, fetchTransactionsByAccountIdAndAssetId, updateTransactionById } from "@/apis/transactions";
import { getAccountId } from "@/helpers/user";
import { authenticateToken } from "@/middlewares/authenticateToken";
import { validateHoldingId, validateTransactionId } from "@/middlewares/validators/idValidators";
import { transactionSchemaValidationHandler } from "@/middlewares/validators/schemaValidators";
import { getHoldingByAccountIdAndAssetId } from "@/services";
import { type Request, type Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

// router.use(isAuthenticated);

router.get("/:holdingId", [authenticateToken, validateHoldingId()], async (req: Request, res: Response) => {
  const accountId = getAccountId(req);
  const assetId = req.params["holdingId"] as string; /* mapped to `assetId` */

  return res.status(StatusCodes.OK).json(
    await getHoldingByAccountIdAndAssetId(accountId, assetId)
  );
});

router.get("/:holdingId/transactions", [authenticateToken, validateHoldingId()], async (req: Request, res: Response) => {
  const accountId = getAccountId(req);
  const assetId = req.params["holdingId"] as string; /* mapped to `assetId` */

  return res.status(StatusCodes.OK).json(
    await fetchTransactionsByAccountIdAndAssetId(accountId, assetId),
  );
});

  const transactionId = req.params["transactionId"] as string;

  return res.status(StatusCodes.OK).json(
    await fetchTransactionById(transactionId),
  );
});
router.get("/:holdingId/transactions/:transactionId", [authenticateToken, validateHoldingId(), validateTransactionId()], async (req: Request, res: Response) => {

router.post("/:holdingId/transactions", [authenticateToken, validateHoldingId(), transactionSchemaValidationHandler()], async (req: Request, res: Response) => {
  const accountId = getAccountId(req);
  const { type, price, quantity, fee, value } = req.body;
  const assetId = req.params["holdingId"] as string; /* mapped to `assetId` */

  console.log("assetId", assetId);
  console.log("data", { accountId, assetId, type, price, quantity, fee, value });

  return res.status(StatusCodes.OK).json(
    await addTransaction({ accountId, assetId, type, price, quantity, fee, value }),
  );
});

router.put("/:holdingId/transactions/:transactionId", [authenticateToken, validateTransactionId(), transactionSchemaValidationHandler()], async (req: Request, res: Response) => {
  const accountId = getAccountId(req);
  const transactionId = req.params["transactionId"] as string;
  const { type, price, quantity, fee, value, purchasedAt } = req.body;

  const transaction = await updateTransactionById(transactionId, { type, price, quantity, fee, value });
  // also apply update
  await refreshSummaryData(accountId, transaction.assetId); /* shit should be in a controller method */

  return res.status(StatusCodes.OK).json(
    transaction,
  );
});

export { router as holdingsRoutes };


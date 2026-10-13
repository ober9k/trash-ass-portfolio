import { addTransaction, fetchTransactionById, fetchTransactionsByAccountIdAndAssetId, updateTransactionById } from "@/apis/transactions";
import { getAccountId } from "@/helpers/user";
import { authenticateToken } from "@/middlewares/authenticateToken";
import { holdingIdValidationHandler, transactionIdValidationHandler } from "@/middlewares/validators/idValidators";
import { transactionSchemaValidationHandler } from "@/middlewares/validators/schemaValidators";
import { getHoldingByAccountIdAndAssetId } from "@/services";
import { type Request, type Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

// router.use(isAuthenticated);

router.get("/:holdingId", [authenticateToken, holdingIdValidationHandler()], async (req: Request, res: Response) => {
  const accountId = getAccountId(req);
  const assetId = req.params["holdingId"] as string; /* mapped to `assetId` */

  return res.status(StatusCodes.OK).json(
    await getHoldingByAccountIdAndAssetId(accountId, assetId)
  );
});

router.get("/:holdingId/transactions", [authenticateToken, holdingIdValidationHandler()], async (req: Request, res: Response) => {
  const accountId = getAccountId(req);
  const assetId = req.params["holdingId"] as string; /* mapped to `assetId` */

  return res.status(StatusCodes.OK).json(
    await fetchTransactionsByAccountIdAndAssetId(accountId, assetId),
  );
});

router.get("/:holdingId/transactions/:transactionId", [authenticateToken, holdingIdValidationHandler(), transactionIdValidationHandler()], async (req: Request, res: Response) => {
  const transactionId = req.params["transactionId"] as string;

  return res.status(StatusCodes.OK).json(
    await fetchTransactionById(transactionId),
  );
});

router.post("/:holdingId/transactions", [authenticateToken, holdingIdValidationHandler(), transactionSchemaValidationHandler()], async (req: Request, res: Response) => {
  const accountId = getAccountId(req);
  const { type, price, quantity, fee, value } = req.body;
  const assetId = req.params["holdingId"] as string; /* mapped to `assetId` */

  return res.status(StatusCodes.OK).json(
    await addTransaction({ accountId, assetId, type, price, quantity, fee, value }),
  );
});

router.put("/:holdingId/transactions/:transactionId", [authenticateToken, transactionIdValidationHandler(), transactionSchemaValidationHandler()], async (req: Request, res: Response) => {
  const transactionId = req.params["transactionId"] as string;
  const { type, price, quantity, fee, value } = req.body;

  return res.status(StatusCodes.OK).json(
    await updateTransactionById(transactionId, { type, price, quantity, fee, value }),
  );
});

export { router as holdingsRoutes };


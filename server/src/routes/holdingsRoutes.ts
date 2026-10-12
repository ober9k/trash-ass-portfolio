import { fetchTransactionsByAccountIdAndAssetId } from "@/apis/transactions";
import { getAccountId } from "@/helpers/user";
import { authenticateToken } from "@/middlewares/authenticateToken";
import { holdingIdValidationHandler } from "@/middlewares/validators/idValidators";
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

export { router as holdingsRoutes };

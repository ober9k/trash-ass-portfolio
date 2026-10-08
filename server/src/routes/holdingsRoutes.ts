import { fetchTransactionsByAccountIdAndAssetId } from "@/apis/transactions";
import { holdingIdValidationHandler } from "@/middlewares/validators/idValidators";
import { getHoldingByAccountIdAndAssetId } from "@/services";
import { type Request, type Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

// router.use(isAuthenticated);

router.get("/:holdingId", [holdingIdValidationHandler()], async (req: Request, res: Response) => {
  const accountId = ""; /* TODO: provide `accountId` */
  const assetId = req.params["holdingId"] as string; /* mapped to `assetId` */

  return res.status(StatusCodes.OK).json(
    await getHoldingByAccountIdAndAssetId(accountId, assetId)
  );
});

router.get("/:holdingId/transactions", [holdingIdValidationHandler()], async (req: Request, res: Response) => {
  const accountId = ""; /* TODO: provide `accountId` */
  const assetId = req.params["holdingId"] as string; /* mapped to `assetId` */

  return res.status(StatusCodes.OK).json(
    await fetchTransactionsByAccountIdAndAssetId(accountId, assetId),
  );
});

export { router as holdingsRoutes };

import { fetchAssetById } from "@/apis/assets";
import { getSummaryByAccountIdAndAssetId as fetchHoldingByAccountIdAndAssetId } from "@/apis/summaries";
import { fetchTransactionsByAccountIdAndAssetId } from "@/apis/transactions";
import { holdingIdValidationHandler } from "@/middlewares/validators/idValidators";
import { Router, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

// router.use(isAuthenticated);

router.get("/:holdingId", [holdingIdValidationHandler()], async (req: Request, res: Response) => {
  const accountId = ""; /* TODO: provide `accountId` */
  const assetId = req.params["holdingId"] as string; /* mapped to `assetId` */

  const asset = await fetchAssetById(assetId);
  const summary = await fetchHoldingByAccountIdAndAssetId(accountId, assetId);

  return res.status(StatusCodes.OK).json({
    asset, summary
  });
});

router.get("/:holdingId/transactions", async (req: Request, res: Response) => {
  const accountId = ""; /* TODO: provide `accountId` */
  const assetId = req.params["holdingId"] as string; /* mapped to `assetId` */

  return res.status(StatusCodes.OK).json(
    await fetchTransactionsByAccountIdAndAssetId(accountId, assetId),
  );
});

export { router as holdingsRoutes };

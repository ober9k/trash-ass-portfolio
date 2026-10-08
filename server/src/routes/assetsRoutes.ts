import { fetchAssetById, fetchAssetByTicker } from "@/apis/assets";
import { assetIdValidationHandler } from "@/middlewares/validators/idValidators";
import { type Request, type Response, Router } from "express";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";

const router = Router();

// router.use(isAuthenticated);

router.get("/:assetId", [assetIdValidationHandler()], async (req: Request, res: Response) => {
  const assetId = req.params["assetId"] as string;

  return res.status(StatusCodes.OK).json(
    await fetchAssetById(assetId),
  );
});

router.get("/tickers/:ticker", [/* ticker check */], async (req: Request, res: Response) => {
  const ticker = req.params["ticker"] as string;

  return res.status(StatusCodes.OK).json(
    await fetchAssetByTicker(ticker.toLocaleUpperCase()),
  );
});

export { router as assetsRoutes };

import { fetchAssetById } from "@/apis/assets";
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

export { router as assetsRoutes };

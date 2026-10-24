import { createAsset, getAsset, getAssets, updateAsset } from "@/controllers/assetsController";
import { validateAssetId } from "@/middlewares/validators/idValidators";
import { validateAssetSchema } from "@/middlewares/validators/schemaValidators";
import { Router } from "express";

const router = Router();

router.get("/", [], getAssets);
router.get("/:assetId", [validateAssetId()], getAsset);
router.post("/", [validateAssetSchema()], createAsset);
router.put("/:assetId", [validateAssetId(), validateAssetSchema()], updateAsset);

export { router as assetsRoutes };

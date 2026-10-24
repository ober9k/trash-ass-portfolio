import { getHolding, getHoldings } from "@/controllers/me/holdingsController";
import { validateHoldingId } from "@/middlewares/validators/idValidators";
import { Router } from "express";

const router = Router()
  .get("", getHoldings)
  .get("/:holdingId", [validateHoldingId()], getHolding);

export { router as holdingsRoutes };

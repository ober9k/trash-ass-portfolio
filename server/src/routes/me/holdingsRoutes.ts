import { getHolding, getHoldings, getHoldingTransactions } from "@/controllers/me/holdingsController";
import { validateHoldingId } from "@/middlewares/validators/idValidators";
import { Router } from "express";

const router = Router()
  .get("", getHoldings)
  .get("/:holdingId", [validateHoldingId()], getHolding)
  .get("/:holdingId/transactions", [validateHoldingId()], getHoldingTransactions);

export { router as holdingsRoutes };

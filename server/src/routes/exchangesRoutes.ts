import { createExchange, getExchange, getExchanges, updateExchange } from "@/controllers/exchangesController";
import { validateExchangeId } from "@/middlewares/validators/idValidators";
import { validateExchangeSchema } from "@/middlewares/validators/schemaValidators";
import { Router } from "express";

const router = Router()
  .get("/", [], getExchanges)
  .get("/:exchangeId", [validateExchangeId()], getExchange)
  .post("/", [validateExchangeSchema()], createExchange)
  .put("/:exchangeId", [validateExchangeId(), validateExchangeSchema()], updateExchange);

export { router as exchangesRoutes };

import { createExchange, getExchange, getExchanges, updateExchange } from "@/controllers/exchangesController";
import { validateExchangeId } from "@/middlewares/validators/idValidators";
import { validateExchangeSchema } from "@/middlewares/validators/schemaValidators";
import { Router } from "express";

const router = Router();

router.get("/", [], getExchanges);
router.get("/:exchangeId", [validateExchangeId()], getExchange);
router.post("/", [validateExchangeSchema()], createExchange);
router.put("/:exchangeId", [validateExchangeId(), validateExchangeSchema()], updateExchange);

export { router as exchangesRoutes };

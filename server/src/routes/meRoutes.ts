import { authenticateToken } from "@/middlewares/authenticateToken";
import { holdingsRoutes } from "@/routes/me/holdingsRoutes";
import { portfolioRoutes } from "@/routes/me/portfolioRoutes";
import { transactionsRoutes } from "@/routes/me/transactionsRoutes";
import { Router } from "express";

const router = Router()
  .use(authenticateToken)
  .use("/holdings", holdingsRoutes)
  .use("/portfolio", portfolioRoutes)
  .use("/transactions", transactionsRoutes);

export { router as meRoutes };

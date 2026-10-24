import { authenticateToken } from "@/middlewares/authenticateToken";
import { holdingsRoutes } from "@/routes/me/holdingsRoutes";
import { portfolioRoutes } from "@/routes/me/portfolioRoutes";
import { Router } from "express";

const router = Router()
  .use(authenticateToken)
  .use("/holdings", holdingsRoutes)
  .use("/portfolio", portfolioRoutes);

export { router as meRoutes };

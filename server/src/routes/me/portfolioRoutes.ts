import { getPortfolio } from "@/controllers/me/portfolioController";
import { Router } from "express";

const router = Router()
  .get("", getPortfolio);

export { router as portfolioRoutes };

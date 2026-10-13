import { getHoldings, getPortfolio } from "@/services";
import { Period } from "@shared/types/period";
import { type Request, type Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

// router.use(isAuthenticated);

router.get("", async (req: Request, res: Response) => {
  const period = req.query.period; // this needs to be validated

  return res.status(StatusCodes.OK).json(
    await getPortfolio(period as Period),
  );
});

router.get("/holdings", async (req: Request, res: Response) => {
  const period = req.query.period; // this needs to be validated

  return res.status(StatusCodes.OK).json(
    await getHoldings(period as Period),
  );
});

export { router as portfolioRoutes };

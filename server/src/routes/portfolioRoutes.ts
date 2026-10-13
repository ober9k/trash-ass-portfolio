import { getAccountId } from "@/helpers/user";
import { authenticateToken } from "@/middlewares/authenticateToken";
import { getHoldingsByAccountId, getPortfolioByAccountId } from "@/services";
import { Period } from "@shared/types/period";
import { type Request, type Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

// router.use(isAuthenticated);

router.get("", [authenticateToken], async (req: Request, res: Response) => {
  const accountId = getAccountId(req);
  const period = req.query.period; // this needs to be validated

  return res.status(StatusCodes.OK).json(
    await getPortfolioByAccountId(accountId, period as Period),
  );
});

router.get("/holdings", [authenticateToken], async (req: Request, res: Response) => {
  const accountId = getAccountId(req);
  const period = req.query.period; // this needs to be validated

  return res.status(StatusCodes.OK).json(
    await getHoldingsByAccountId(accountId, period as Period),
  );
});

export { router as portfolioRoutes };

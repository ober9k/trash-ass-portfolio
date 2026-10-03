import { isAuthenticated } from "@/middlewares/authenticateToken";
import type { Request, Response } from "express";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router()

router.use(isAuthenticated);

router.get("/assets", async (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json(
    null,
    // await seedAssets(),
  );
});

router.get("/exchanges", async (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json(
    null,
    // await seedExchanges(),
  );
});

router.get("/summaries", async (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json(
    null,
    // await seedSummaries(),
  );
});

router.get("/transactions", async (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json(
    null,
    //await seedTransactions(),
  );
});

export { router as seedRoutes };

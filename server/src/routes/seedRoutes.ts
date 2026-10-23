import { seedAssets, seedExchanges, seedSummaries, seedTransactions } from "@/apis/helpers";
import type { Request, Response } from "express";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router()

/**
 * These should be selectively enabled locally as needed.
 */
const disableSeedAssets       = true; /* we don't need for now */
const disableSeedExchanges    = true; /* we don't need for now */
const disableSeedSummaries    = true; /* we don't need for now */
const disableSeedTransactions = true; /* we don't need for now */

router.get("/assets", async (req: Request, res: Response) => {
  if (disableSeedAssets) {
    return res.status(StatusCodes.FORBIDDEN).json("Forbidden!");
  }

  return res.status(StatusCodes.OK).json(
    await seedAssets(),
  );
});

router.get("/exchanges", async (req: Request, res: Response) => {
  if (disableSeedExchanges) {
    return res.status(StatusCodes.FORBIDDEN).json("Forbidden!");
  }

  return res.status(StatusCodes.OK).json(
    await seedExchanges(),
  );
});

router.get("/summaries", async (req: Request, res: Response) => {
  if (disableSeedSummaries) {
    return res.status(StatusCodes.FORBIDDEN).json("Forbidden!");
  }

  return res.status(StatusCodes.OK).json(
    await seedSummaries(),
  );
});

router.get("/transactions", async (req: Request, res: Response) => {
  if (disableSeedTransactions) {
    return res.status(StatusCodes.FORBIDDEN).json("Forbidden!");
  }

  return res.status(StatusCodes.OK).json(
    await seedTransactions(),
  );
});

export { router as seedRoutes };

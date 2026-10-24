import { getAccountId } from "@/helpers/user";
import { getUserPortfolio } from "@/services/me/portfolioService";
import { Period } from "@shared/types/period";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function getPortfolio(req: Request, res: Response) {
  const accountId = getAccountId(req);
  const period    = req.query.period; // this needs to be validated

  return res.status(StatusCodes.OK).json(
    await getUserPortfolio(accountId, period as Period),
  );
}

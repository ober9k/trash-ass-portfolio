import { fetchUserHoldingTransactionsByAssetId } from "@/apis/transactions";
import { getAccountId } from "@/helpers/user";
import { getUserHoldings, getUserHoldingByAssetId } from "@/services/me/holdingsService";
import { Period } from "@shared/types/period";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getHoldingId(req: Request): string {
  return req.params["holdingId"] as string;
}

export async function getHoldings(req: Request, res: Response) {
  const accountId = getAccountId(req);
  const period    = req.query.period; // this needs to be validated

  return res.status(StatusCodes.OK).json(
    await getUserHoldings(accountId, period as Period),
  );
}

export async function getHolding(req: Request, res: Response) {
  const accountId = getAccountId(req);
  const holdingId = getHoldingId(req);

  return res.status(StatusCodes.OK).json(
    await getUserHoldingByAssetId(accountId, holdingId)
  );
}

export async function getHoldingTransactions(req: Request, res: Response) {
  const accountId = getAccountId(req);
  const holdingId = getHoldingId(req);

  return res.status(StatusCodes.OK).json(
    await fetchUserHoldingTransactionsByAssetId(accountId, holdingId), /* mapped to `assetId` */
  );
}

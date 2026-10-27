import { getUserId } from "@/helpers/user";
import { refreshSummaryData } from "@/services/me/summariesService";
import { createUserTransaction, fetchUserTransaction, fetchUserTransactionsByAssetId, updateUserTransaction } from "@/services/me/transactionsService";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getHoldingId(req: Request): string {
  return req.params["holdingId"] as string;
}

function getTransactionId(req: Request): string {
  return req.params["transactionId"] as string;
}

export async function getTransactions(req: Request, res: Response) {
  const userId    = getUserId(req);
  const holdingId = getHoldingId(req);

  return res.status(StatusCodes.OK).json(
    await fetchUserTransactionsByAssetId(userId, holdingId), /* mapped to `assetId` */
  );
}

export async function getTransaction(req: Request, res: Response) {
  const userId        = getUserId(req);
  const transactionId = getTransactionId(req);

  return res.status(StatusCodes.OK).json(
    await fetchUserTransaction(userId, transactionId),
  );
}

export async function createTransaction(req: Request, res: Response) {
  const userId    = getUserId(req);
  const holdingId = getHoldingId(req);
  const { type, price, quantity, fee, value, purchasedAt } = req.body;

  const transaction = await createUserTransaction(userId, { assetId: holdingId, type, price, quantity, fee, value, purchasedAt }); /* mapped to `assetId` */
  await refreshSummaryData(userId, holdingId); // also apply update

  return res.status(StatusCodes.OK).json(
    transaction,
  );
}

export async function updateTransaction(req: Request, res: Response) {
  const userId        = getUserId(req);
  const holdingId     = getHoldingId(req);
  const transactionId = getTransactionId(req);
  const { type, price, quantity, fee, value, purchasedAt } = req.body;

  const transaction = await updateUserTransaction(userId, transactionId, { type, price, quantity, fee, value, purchasedAt });
  await refreshSummaryData(userId, holdingId); // also apply update

  return res.status(StatusCodes.OK).json(
    transaction,
  );
}

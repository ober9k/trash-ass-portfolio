import { refreshSummaryData } from "@/apis/summaries";
import { createUserTransaction, fetchUserTransactionById, fetchUserHoldingTransactionsByAssetId, updateUserTransactionById } from "@/apis/transactions";
import { getAccountId } from "@/helpers/user";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function getHoldingId(req: Request): string {
  return req.params["holdingId"] as string;
}

function getTransactionId(req: Request): string {
  return req.params["transactionId"] as string;
}

export async function getTransactions(req: Request, res: Response) {
  const accountId = getAccountId(req);
  const holdingId = getHoldingId(req);

  return res.status(StatusCodes.OK).json(
    await fetchUserHoldingTransactionsByAssetId(accountId, holdingId), /* mapped to `assetId` */
  );
}

export async function getTransaction(req: Request, res: Response) {
  const accountId     = getAccountId(req);
  const transactionId = getTransactionId(req);

  return res.status(StatusCodes.OK).json(
    await fetchUserTransactionById(accountId, transactionId),
  );
}

export async function createTransaction(req: Request, res: Response) {
  const accountId = getAccountId(req);
  const holdingId = getHoldingId(req);
  const { type, price, quantity, fee, value, purchasedAt } = req.body;

  const transaction = await createUserTransaction(accountId, { assetId: holdingId, type, price, quantity, fee, value, purchasedAt }); /* mapped to `assetId` */
  await refreshSummaryData(accountId, holdingId); // also apply update

  return res.status(StatusCodes.OK).json(
    transaction,
  );
}

export async function updateTransaction(req: Request, res: Response) {
  const accountId     = getAccountId(req);
  const holdingId     = getHoldingId(req);
  const transactionId = getTransactionId(req);
  const { type, price, quantity, fee, value, purchasedAt } = req.body;

  const transaction = await updateUserTransactionById(transactionId, { type, price, quantity, fee, value, purchasedAt });
  await refreshSummaryData(accountId, holdingId); // also apply update

  return res.status(StatusCodes.OK).json(
    transaction,
  );
}

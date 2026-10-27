import { firestore } from "@/firebase";
import HttpException from "@/models/httpException";
import type { DbTransaction } from "@shared/types/db/dbTransaction";
import { AggregateField, FieldValue } from "firebase-admin/firestore";
import { StatusCodes } from "http-status-codes";

function getCollection() {
  return firestore.collection("transactions");
}

function toTransaction(doc): DbTransaction {
  return {
    id:          doc.id,
    assetId:     doc.data().assetId, /* used for grouping */
    type:        doc.data().type ?? undefined,
    price:       doc.data().price,
    quantity:    doc.data().quantity,
    fee:         doc.data().fee,
    value:       doc.data().total,
    purchasedAt: doc.data().purchasedAt.toDate(),
  };
}

function isOwnTransaction(doc, accountId: string): boolean {
  return doc.data()?.accountId === accountId;
}

function assertTransactionExists(doc) {
  if (doc.exists) return;
  throw new HttpException(StatusCodes.NOT_FOUND, "Not Found", "Transaction for given `transactionId` not found.");
}

function assertIsOwnTransaction(doc, accountId: string) {
  if (isOwnTransaction(doc, accountId)) return;
  throw new HttpException(StatusCodes.FORBIDDEN, "Forbidden", "Transaction for given `transactionId` is not accessible.");
}

/**
 * Return all transactions.
 * Not recommended for use as the asset is not returned.
 * @param limit
 */
export async function fetchTransactions(limit: number = 10): Promise<DbTransaction[]> {
  const ref = getCollection().orderBy("purchasedAt", "desc").limit(limit);
  const res = await ref.get();
  return res.docs.map(toTransaction);
}

/**
 * Return all linked transactions for the specified asset.
 * @param assetId
 * @param limit
 */
export async function fetchTransactionsByAssetId(assetId: string, limit: number = 10): Promise<DbTransaction[]> {
  const ref = getCollection().where("assetId", "==", assetId).orderBy("purchasedAt", "desc").limit(limit);
  const res = await ref.get();
  return res.docs.map(toTransaction);
}

export async function fetchUserTransactionsByAssetId(accountId: string, assetId: string, limit: number = 10): Promise<DbTransaction[]> {
  const ref = getCollection()
    .where("accountId", "==", accountId)
    .where("assetId", "==", assetId)
    .orderBy("purchasedAt", "desc")
    .limit(limit);
  const res = await ref.get();
  return res.docs.map(toTransaction);
}

export async function fetchTransaction(transactionId: string): Promise<DbTransaction> {
  const ref = getCollection().doc(transactionId);
  const res = await ref.get();

  assertTransactionExists(res);

  return toTransaction(res);
}

export async function fetchUserTransaction(accountId: string, transactionId: string): Promise<DbTransaction> {
  const ref = getCollection().doc(transactionId);
  const res = await ref.get();

  assertTransactionExists(res);
  assertIsOwnTransaction(res, accountId);

  return toTransaction(res);
}

export async function createUserTransaction(accountId: string, data: any): Promise<DbTransaction> {
  const ref = getCollection();
  const res = await ref.add({
    userId:      accountId, /* handle separately as it works relative to the current session */
    assetId:     data.assetId,
    type:        data.type,
    price:       data.price,
    quantity:    data.quantity,
    fee:         data.fee,
    total:       data.value, /* fix conflict */
    // purchasedAt: data.purchasedAt.toIsoString(),
    purchasedAt: FieldValue.serverTimestamp(),
    createdAt:   FieldValue.serverTimestamp(),
    updatedAt:   FieldValue.serverTimestamp(),
  });

  return toTransaction(await res.get());
}

export async function updateUserTransaction(accountId: string, transactionId: string, data: any): Promise<DbTransaction> {
  const ref = getCollection().doc(transactionId);
  const res = await ref.get();

  assertTransactionExists(res);
  assertIsOwnTransaction(res, accountId);

  await ref.set({
    type:        data.type,
    price:       data.price,
    quantity:    data.quantity,
    fee:         data.fee,
    total:       data.value, /* fix conflict */
    // purchasedAt: data.purchasedAt.toIsoString(),
    updatedAt:   FieldValue.serverTimestamp(),
  }, { merge: true });

  return toTransaction(await ref.get());
}

export async function aggregateTransactionsByAccountIdAndAssetId(accountId: string, assetId: string): Promise<{ quantity: number, fee: number, total: number }> {
  const ref = getCollection()
    .where("accountId", "==", accountId)
    .where("assetId", "==", assetId);

  const res = await ref.aggregate({
    quantity:     AggregateField.sum("quantity"),
    fee:          AggregateField.sum("fee"),
    initialValue: AggregateField.sum("total"),
  });

  return (await res.get()).data();
}

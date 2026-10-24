import { firestore } from "@/firebase";
import HttpException from "@/models/httpException";
import { aggregateTransactionsByAccountIdAndAssetId } from "@/services/me/transactionsService";
import type { DbSummary } from "@shared/types/db/dbSummary";
import { FieldValue } from "firebase-admin/firestore";
import { StatusCodes } from "http-status-codes";

function getCollection() {
  return firestore.collection("summaries");
}

function toSummary(doc): DbSummary {
  return {
    id:           doc.id,
    assetId:      doc.data().assetId, /* used for grouping */
    apiId:        doc.data().apiId,
    quantity:     doc.data().quantity,
    fee:          doc.data().fee,
    initialValue: doc.data().initialValue,
    createdAt:    doc.data().createdAt.toDate(),
    updatedAt:    doc.data().updatedAt.toDate(),
  };
}

function assertSummaryExists(doc) {
  if (doc.exists) return;
  throw new HttpException(StatusCodes.NOT_FOUND, "Not Found", "Summary for given `summaryId` not found.");
}

/**
 * Return all summaries.
 * Not recommended for use as the asset is not returned.
 */
export async function fetchSummaries(): Promise<DbSummary[]> {
  const ref = getCollection();
  const res = await ref.get();
  return res.docs.map(toSummary);
}

export async function fetchUserSummaries(accountId: string): Promise<DbSummary[]> {
  const ref = getCollection()
    .where("accountId", "==", accountId);

  const res = await ref.get();
  return res.docs.map(toSummary);
}

async function fetchSummaryBy(field: string, value: string | number): Promise<DbSummary> {
  const ref = getCollection().where(field, "==", value).limit(1);
  const res = await ref.get();

  assertSummaryExists(res);

  return res.docs.map(toSummary).pop();
}

export async function fetchSummaryByAssetId(assetId: string): Promise<DbSummary> {
  return await fetchSummaryBy("assetId", assetId);
}

export async function addSummary(data: any): Promise<DbSummary> {
  const ref = getCollection();
  const res = await ref.add({
    assetId:      data.assetId,
    apiId:        data.apiId,
    quantity:     data.quantity,
    fee:          data.fee,
    initialValue: data.initialValue,
    createdAt:    FieldValue.serverTimestamp(),
    updatedAt:    FieldValue.serverTimestamp(),
  });

  return toSummary(await res.get());
}

export async function updateSummary(id: string, data: any): Promise<DbSummary> {
  const ref = getCollection().doc(id);
  await ref.set({
    assetId:      data.assetId,
    apiId:        data.apiId,
    quantity:     data.quantity,
    fee:          data.fee,
    initialValue: data.initialValue,
    updatedAt:    FieldValue.serverTimestamp(),
  });

  return toSummary(await ref.get());
}

export async function updateSummaryData(id: string, data: any): Promise<DbSummary> {
  console.log(id, data);

  const ref = getCollection().doc(id);
  await ref.set({
    quantity:     data.quantity,
    fee:          data.fee,
    initialValue: data.initialValue,
    updatedAt:    FieldValue.serverTimestamp(),
  }, { merge: true });

  return toSummary(await ref.get());
}

export async function refreshSummaryData(accountId: string, assetId: string): Promise<DbSummary> {
  const id = await fetchUserSummaryIdByAssetId(accountId, assetId);
  const data = await aggregateTransactionsByAccountIdAndAssetId(accountId, assetId);

  return await updateSummaryData(id, { ...data })
}

export async function fetchUserSummaryByAssetId(accountId: string, assetId: string): Promise<DbSummary> {
  const ref = getCollection()
    .where("accountId", "==", accountId)
    .where("assetId", "==", assetId)
    .limit(1);

  const res = await ref.get();

  if (res.empty) {
    throw new HttpException(StatusCodes.NOT_FOUND, "Not Found", "Summary for given `accountId` and `assetId` not found.");
  }

  return res.docs.map(toSummary).pop();
}

export async function fetchUserSummaryIdByAssetId(accountId: string, assetId: string): Promise<string> {
  const summary = await fetchUserSummaryByAssetId(accountId, assetId);
  return summary.id;
}

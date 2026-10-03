import { firestore } from "@/firebase";
import type { DbSummary } from "@shared/types/db/dbSummary";
import { FieldValue } from "firebase-admin/firestore";

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

/**
 * Return all summaries.
 * Not recommended for use as the asset is not returned.
 */
export async function fetchSummaries(): Promise<DbSummary[]> {
  const ref = getCollection();
  const res = await ref.get();
  return res.docs.map(toSummary);
}

async function fetchSummaryBy(field: string, value: string | number): Promise<DbSummary> {
  const ref = getCollection().where(field, "==", value).limit(1);
  const res = await ref.get();

  if (res.empty) {
    throw Error(`Summary with given \`${field}\` not found.`)
  }

  return res.docs.map(toSummary).pop();
}

export async function fetchSummaryByApiId(apiId: number): Promise<DbSummary> {
  return await fetchSummaryBy("apiId", apiId);
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

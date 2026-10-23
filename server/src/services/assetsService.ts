import { firestore } from "@/firebase";
import HttpException from "@/models/httpException";
import { type DbAsset } from "@shared/types/db/dbAsset";
import { Ticker } from "@shared/types/ticker";
import { FieldPath, FieldValue } from "firebase-admin/firestore";
import { StatusCodes } from "http-status-codes";

function getCollection() {
  return firestore.collection("assets");
}

function toAsset(doc): DbAsset {
  return {
    id:     doc.id,
    apiId:  doc.data().apiId,
    ticker: doc.data().ticker as Ticker,
    name:   doc.data().name,
  };
}

export async function fetchAssets(): Promise<DbAsset[]> {
  const ref = getCollection();
  const res = await ref.get();
  return res.docs.map(toAsset);
}

export async function fetchAssetsByIds(ids: string[]): Promise<DbAsset[]> {
  const ref = getCollection().where(FieldPath.documentId(), "in", ids);
  const res = await ref.get();
  return res.docs.map(toAsset);
}

export async function fetchAsset(id: string): Promise<DbAsset> {
  const ref = getCollection().doc(id);
  const res = await ref.get();

  if (!res.exists) {
    throw new HttpException(StatusCodes.NOT_FOUND, "Not Found", "Asset for given `assetId` not found.");
  }

  return toAsset(res);
}

export async function createAsset(data: any): Promise<DbAsset> {
  const ref = getCollection();
  const res = await ref.add({
    apiId:     data.apiId,
    name:      data.name,
    ticker:    data.ticker,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  return toAsset(await res.get());
}

export async function updateAsset(id: string, data: any): Promise<DbAsset> {
  const ref = getCollection().doc(id);
  await ref.set({
    apiId:     data.apiId,
    name:      data.name,
    ticker:    data.ticker,
    updatedAt: FieldValue.serverTimestamp(),
  });

  return toAsset(await ref.get());
}

export async function createFixedAsset(id: string, data: any): Promise<DbAsset> {
  const ref = getCollection().doc(id);
  await ref.set({
    apiId:     data.apiId,
    name:      data.name,
    ticker:    data.ticker,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  return toAsset(await ref.get());
}

/* aliases to avoid conflicts */
export { fetchAssets as dbFetchAssets };
export { fetchAssetsByIds as dbFetchAssetsByIds };
export { fetchAsset  as dbFetchAsset  };
export { createAsset as dbCreateAsset };
export { updateAsset as dbUpdateAsset };

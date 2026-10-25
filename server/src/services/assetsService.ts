import { firestore } from "@/firebase";
import HttpException from "@/models/httpException";
import { createConverter, updateConverter } from "@/services/assetsConverter";
import { deleteConverter } from "@/services/exchangesConverter";
import { type DbAsset } from "@shared/types/db/dbAsset";
import { FieldPath } from "firebase-admin/firestore";
import { StatusCodes } from "http-status-codes";

function getCollection() {
  return firestore.collection("assets");
}

export async function fetchAssets(): Promise<DbAsset[]> {
  const ref = getCollection()
    .withConverter(createConverter)
    .where("deleted", "==", false);

  const res = await ref.get();

  return res.docs.map(_ => _.data()) as DbAsset[];
}

export async function fetchAssetsByIds(ids: string[]): Promise<DbAsset[]> {
  const ref = getCollection()
    .withConverter(createConverter)
    .where(FieldPath.documentId(), "in", ids)
    .where("deleted", "==", false);

  const res = await ref.get();

  return res.docs.map(_ => _.data()) as DbAsset[];
}

export async function fetchAsset(id: string): Promise<DbAsset> {
  const ref = getCollection()
    .withConverter(createConverter)
    .where(FieldPath.documentId(), "==", id)
    .where("deleted", "==", false)
    .limit(1);

  const res = await ref.get();

  if (res.empty) {
    throw new HttpException(StatusCodes.NOT_FOUND, "Not Found", "Asset for given `assetId` not found.");
  }

  return res.docs.map(_ => _.data()).pop() as DbAsset;
}

export async function createAsset(data: any): Promise<DbAsset> {
  const ref = await getCollection()
    .withConverter(createConverter)
    .add(data);

  const res = await ref.get();

  return res.data() as DbAsset;
}

export async function createFixedAsset(id: string, data: any): Promise<DbAsset> {
  const ref = getCollection()
    .withConverter(createConverter)
    .doc(id);

  await ref.set(data);

  return fetchAsset(id);
}

export async function updateAsset(id: string, data: any): Promise<DbAsset> {
  const ref = getCollection()
    .withConverter(updateConverter)
    .doc(id);

  await ref.set(data, { merge: true });

  return fetchAsset(id);
}

export async function deleteAsset(id: string): Promise<void> {
  const ref = getCollection()
    .withConverter(deleteConverter)
    .doc(id);

  await ref.set({}, { merge: true });

  return;
}

/* aliases to avoid conflicts */
export { fetchAssets as dbFetchAssets };
export { fetchAssetsByIds as dbFetchAssetsByIds };
export { fetchAsset  as dbFetchAsset  };
export { createAsset as dbCreateAsset };
export { updateAsset as dbUpdateAsset };
export { deleteAsset as dbDeleteAsset };

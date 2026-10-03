import { firestore } from "@/firebase";
import { type DbAsset } from "@shared/types/db/dbAsset";
import { Ticker } from "@shared/types/ticker";

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

async function fetchAssetBy(field: string, value: string | number): Promise<DbAsset> {
  const ref = getCollection().where(field, "==", value).limit(1);
  const res = await ref.get();

  if (res.empty) {
    throw Error(`Asset with given \`${field}\` not found.`)
  }

  return res.docs.map(toAsset).pop();
}

async function fetchAssetsBy(field: string, values: string[] | number[]): Promise<DbAsset[]> {
  const ref = getCollection().where(field, "in", values).limit(1);
  const res = await ref.get();
  return res.docs.map(toAsset);
}

export async function fetchAssetById(id: string): Promise<DbAsset> {
  return await fetchAssetBy("id", id);
}

export async function fetchAssetByApiId(apiId: number): Promise<DbAsset> {
  return await fetchAssetBy("apiId", apiId);
}

export async function fetchAssetByTicker(ticker: string): Promise<DbAsset> {
  return await fetchAssetBy("ticker", ticker);
}

export async function fetchAssetsByIds(ids: string[]): Promise<DbAsset[]> {
  return await fetchAssetsBy("id", ids);
}

export async function fetchAssetsByApiIds(apiIds: number[]): Promise<DbAsset[]> {
  return await fetchAssetsBy("apiId", apiIds);
}

export async function fetchAssetsByTickers(tickers: string[]): Promise<DbAsset[]> {
  return await fetchAssetsBy("ticker", tickers);
}

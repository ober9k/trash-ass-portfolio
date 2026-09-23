import { firestoreDb } from "@/firebase";
import { type DbAsset } from "@shared/types/asset";
import type { PortfolioAsset } from "@shared/types/portfolio";
import { Ticker } from "@shared/types/ticker";
import { FieldPath, QuerySnapshot } from "firebase-admin/firestore";

function parseDocs(docs: QuerySnapshot): any[] {
  if (docs.empty) {
    return [];
  }

  const results = [];

  docs.forEach((t) => {
    results.push({ id: t.id, ...t.data() });
  });

  return results;
}

export async function fetchAssets(): Promise<PortfolioAsset[]> {
  const assetsRef = firestoreDb.collection("assets");
  const assetsDocs = await assetsRef.get();
  return parseDocs(assetsDocs);
}

export async function fetchAssetsByIds(assetIds: string[]) {
  const assetsRef = firestoreDb.collection("assets").where(FieldPath.documentId(), "in", assetIds);
  const assetsDocs = await assetsRef.get();
  return parseDocs(assetsDocs);
}

export async function fetchAssetByTicker(ticker: string): Promise<DbAsset> {
  const assetRef = firestoreDb.collection("assets").where("ticker" , "==", ticker).limit(1);
  const assetSnapshot = await assetRef.get();

  if (assetSnapshot.empty) {
    throw Error("Asset with given `ticker` not found.")
  }

  const [ doc ] = assetSnapshot.docs;

  return {
    id:     doc.id,
    ticker: doc.data().ticker,
    name:   doc.data().name,
  };
}

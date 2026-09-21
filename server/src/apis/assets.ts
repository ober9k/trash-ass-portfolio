import { firestoreDb } from "@/firebase";
import type { PortfolioAsset } from "@shared/types/portfolio";
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

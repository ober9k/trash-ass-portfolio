import { firestore } from "@/firebase";
import type { DbTransaction } from "@shared/types/db/dbTransaction";

function getCollection() {
  return firestore.collection("transactions");
}

function toTransaction(doc): DbTransaction {
  return {
    id:          doc.id,
    assetId:     doc.data().assetId, /* used for grouping */
    price:       doc.data().price,
    quantity:    doc.data().quantity,
    fee:         doc.data().fee,
    value:       doc.data().total,
    purchasedAt: doc.data().purchasedAt.toDate(),
  };
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

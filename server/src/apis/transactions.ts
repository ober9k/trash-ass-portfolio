import { firestore } from "@/firebase";
import type { DbTransaction } from "@shared/types/dbTransaction";

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
 */
export async function fetchTransactions(): Promise<DbTransaction[]> {
  const ref = firestore.collection("transactions");
  const res = await ref.get();
  return res.docs.map(toTransaction);
}

/**
 * Return all linked transactions for the specified asset.
 * @param assetId
 */
export async function fetchTransactionsByAssetId(assetId: string): Promise<DbTransaction[]> {
  const ref = firestore.collection("transactions").where("assetId", "==", assetId).orderBy("purchasedAt", "desc");
  const res = await ref.get();
  return res.docs.map(toTransaction);
}

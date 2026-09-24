import { firestore } from "@/firebase";
import type { Transaction } from "@shared/types/transaction";

function toTransaction(doc): Transaction {
  return {
    id:          doc.id,
    price:       doc.data().price,
    quantity:    doc.data().quantity,
    fee:         doc.data().fee,
    total:       doc.data().total,
    purchasedAt: doc.data().purchasedAt.toDate(),
  };
}

/**
 * Return all transactions.
 * Not recommended for use as the asset is not returned.
 */
export async function fetchTransactions(): Promise<Transaction[]> {
  const ref = firestore.collection("transactions");
  const res = await ref.get();
  return res.docs.map(toTransaction);
}

/**
 * Return all linked transactions for the specified asset.
 * @param assetId
 */
export async function fetchTransactionsByAssetId(assetId: string): Promise<Transaction[]> {
  const ref = firestore.collection("transactions").where("assetId", "==", assetId);
  const res = await ref.get();
  return res.docs.map(toTransaction);
}

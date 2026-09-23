import { firestoreDb } from "@/firebase";
import type { DbTransaction } from "@shared/types/transaction";
import { QuerySnapshot } from "firebase-admin/firestore";

function parseDocs(docs: QuerySnapshot): DbTransaction[] {
  if (docs.empty) {
    return [];
  }

  const results = [];

  docs.forEach((t) => {
    results.push({
      id:          t.id,
      accountId:   t.data().accountId,
      assetId:     t.data().assetId,
      price:       t.data().price,
      quantity:    t.data().quantity,
      fee:         t.data().fee,
      total:       t.data().total,
      purchasedAt: t.data().purchasedAt.toDate(),
    });
  });

  return results;
}

export async function fetchTransactions(): Promise<DbTransaction[]> {
  const transactionsRef = firestoreDb.collection("transactions");
  const transactionsDocs = await transactionsRef.get();
  return parseDocs(transactionsDocs);
}

export async function fetchTransactionsByAssetId(assetId: string): Promise<DbTransaction[]> {
  const transactionsRef = firestoreDb.collection("transactions").where("assetId", "==", assetId);
  const transactionsDocs = await transactionsRef.get();
  return parseDocs(transactionsDocs);
}

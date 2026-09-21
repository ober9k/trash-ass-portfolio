import { transactions } from "@/data/mock/transactions";
import { firestoreDb } from "@/firebase";
import { QuerySnapshot } from "firebase-admin/firestore";

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

export async function fetchTransactions() {
  const transactionsRef = firestoreDb.collection("transactions");
  const transactionsDocs = await transactionsRef.get();
  return parseDocs(transactionsDocs);
}

import { firestore } from "@/firebase";
import type { DbTransaction } from "@shared/types/db/dbTransaction";
import { FieldValue } from "firebase-admin/firestore";

function getCollection() {
  return firestore.collection("transactions");
}

function toTransaction(doc): DbTransaction {
  return {
    id:          doc.id,
    assetId:     doc.data().assetId, /* used for grouping */
    type:        doc.data().type ?? undefined,
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

export async function fetchTransactionById(transactionId: string): Promise<DbTransaction> {
  const ref = getCollection().doc(transactionId);
  const res = await ref.get();

  if (!res.exists) {
    throw new Error(`Transaction with ID ${transactionId} not found`);
  }
  
  return toTransaction(res);
}

export async function addTransaction(data: any): Promise<DbTransaction> {
  const ref = getCollection();
  const res = await ref.add({
    accountId:   data.accountId,
    assetId:     data.assetId,
    type:        data.type,
    price:       data.price,
    quantity:    data.quantity,
    fee:         data.fee,
    total:       data.value, /* fix conflict */
    // purchasedAt: data.purchasedAt.toIsoString(),
    purchasedAt: FieldValue.serverTimestamp(),
    createdAt:   FieldValue.serverTimestamp(),
    updatedAt:   FieldValue.serverTimestamp(),
  });

  return toTransaction(await res.get());
}

export async function updateTransactionById(id: string, data: any): Promise<DbTransaction> {
  const ref = getCollection().doc(id);
  await ref.set({
    type:        data.type,
    price:       data.price,
    quantity:    data.quantity,
    fee:         data.fee,
    total:       data.value, /* fix conflict */
    // purchasedAt: data.purchasedAt.toIsoString(),
    updatedAt:   FieldValue.serverTimestamp(),
  }, { merge: true });

  return toTransaction(await ref.get());
}

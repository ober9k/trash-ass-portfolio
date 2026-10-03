import { firestore } from "@/firebase";
import type { DbExchange } from "@shared/types/db/dbExchange";
import { FieldValue } from "firebase-admin/firestore";

function getCollection() {
  return firestore.collection("exchanges");
}

function toExchange(doc): DbExchange {
  return {
    id:        doc.id,
    name:      doc.data().name,
    website:   doc.data().website,
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  };
}

export async function fetchExchanges(): Promise<DbExchange[]> {
  const ref = getCollection();
  const res = await ref.get();
  return res.docs.map(toExchange);
}

export async function addExchange(data: any): Promise<DbExchange> {
  const ref = getCollection();
  const res = await ref.add({
    name:      data.name,
    website:   data.website,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  return toExchange(await res.get());
}

export async function updateExchange(id: string, data: any): Promise<DbExchange> {
  const ref = getCollection().doc(id);
  await ref.set({
    name:      data.name,
    website:   data.website,
    updatedAt: FieldValue.serverTimestamp(),
  });

  return toExchange(await ref.get());
}

import { firestore } from "@/firebase";
import HttpException from "@/models/httpException";
import type { DbExchange } from "@shared/types/db/dbExchange";
import { FieldValue } from "firebase-admin/firestore";
import { StatusCodes } from "http-status-codes";

function getCollection() {
  return firestore.collection("exchanges");
}

function toExchange(doc): DbExchange {
  return {
    id:      doc.id,
    name:    doc.data().name,
    website: doc.data().website,
  };
}

export async function fetchExchanges(): Promise<DbExchange[]> {
  const ref = getCollection();
  const res = await ref.get();
  return res.docs.map(toExchange);
}

export async function fetchExchange(id: string): Promise<DbExchange> {
  const ref = getCollection().doc(id);
  const res = await ref.get();

  if (!res.exists) {
    throw new HttpException(StatusCodes.NOT_FOUND, "Not Found", "Exchange for given `exchangeId` not found.");
  }

  return toExchange(res);
}

export async function createExchange(data: any): Promise<DbExchange> {
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

/* aliases to avoid conflicts */
export { fetchExchanges as dbFetchExchanges };
export { fetchExchange  as dbFetchExchange  };
export { createExchange as dbCreateExchange };
export { updateExchange as dbUpdateExchange };

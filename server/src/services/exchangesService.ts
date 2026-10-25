import { firestore } from "@/firebase";
import HttpException from "@/models/httpException";
import { createConverter, deleteConverter, updateConverter } from "@/services/exchangesConverter";
import type { ExchangeData } from "@shared/schemas/exchangeSchema";
import type { DbExchange } from "@shared/types/db/dbExchange";
import { FieldPath } from "firebase-admin/firestore";
import { StatusCodes } from "http-status-codes";

function getCollection() {
  return firestore.collection("exchanges");
}

export async function fetchExchanges(): Promise<DbExchange[]> {
  const ref = getCollection()
    .withConverter(createConverter)
    .where("deleted", "==", false);

  const res = await ref.get();

  return res.docs.map(_ => _.data()) as DbExchange[];
}

export async function fetchExchange(id: string): Promise<DbExchange> {
  const ref = getCollection()
    .withConverter(createConverter)
    .where(FieldPath.documentId(), "==", id)
    .where("deleted", "==", false)
    .limit(1);

  const res = await ref.get();

  if (res.empty) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Not Found", "Exchange for given `exchangeId` not found.");
  }

  return res.docs.map(_ => _.data()).pop() as DbExchange;
}

export async function createExchange(data: ExchangeData): Promise<DbExchange> {
  const ref = await getCollection()
    .withConverter(createConverter)
    .add(data);

  const res = await ref.get();

  return res.data() as DbExchange;
}

export async function createFixedExchange(id: string, data: any): Promise<DbExchange> {
  const ref = getCollection()
    .withConverter(createConverter)
    .doc(id);

  await ref.set(data, { merge: true });

  return fetchExchange(id);
}

export async function updateExchange(id: string, data: any): Promise<DbExchange> {
  const ref = getCollection()
    .withConverter(updateConverter)
    .doc(id);

  await ref.set(data, { merge: true });

  return fetchExchange(id);
}

export async function deleteExchange(id: string): Promise<void> {
  const ref = getCollection()
    .withConverter(deleteConverter)
    .doc(id);

  await ref.set({}, { merge: true });

  return;
}

/* aliases to avoid conflicts */
export {
  createExchange as dbCreateExchange, deleteExchange as dbDeleteExchange, fetchExchange as dbFetchExchange,
  fetchExchanges as dbFetchExchanges, updateExchange as dbUpdateExchange
};

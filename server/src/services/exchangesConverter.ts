import type { FsExchange } from "@/types/exchange";
import type { ExchangeData } from "@shared/schemas/exchangeSchema";
import type { DbExchange } from "@shared/types/db/dbExchange";
import type { FirestoreDataConverter, WithFieldValue } from "firebase-admin/firestore";
import { FieldValue, QueryDocumentSnapshot } from "firebase-admin/firestore";

/**
 * Shared converter for create/update cases.
 */
const fromFirestore = (snapshot: QueryDocumentSnapshot<FsExchange>): DbExchange => ({
  id:      snapshot.id,
  name:    snapshot.data().name,
  website: snapshot.data().website,
});

export const createConverter: FirestoreDataConverter<ExchangeData> = {
  toFirestore: (data: WithFieldValue<ExchangeData>) => ({
    ...data,
    deleted:   false, // handle delete field too
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }),
  fromFirestore,
};

export const updateConverter: FirestoreDataConverter<ExchangeData> = {
  toFirestore: (data: WithFieldValue<ExchangeData>) => ({
    ...data,
    deleted:   false, // handle delete field too
    updatedAt: FieldValue.serverTimestamp(),
  }),
  fromFirestore,
};

export const deleteConverter: FirestoreDataConverter<ExchangeData> = {
  toFirestore: () => ({
    deleted:   true,
    deletedAt: FieldValue.serverTimestamp(),
  }),
  fromFirestore,
};

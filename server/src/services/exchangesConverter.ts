import type { FsExchange } from "@/types/exchange";
import { withCreatedAt, withDeletedAt, withUpdatedAt } from "@/utils/converterUtils";
import type { ExchangeData } from "@shared/schemas/exchangeSchema";
import type { DbExchange } from "@shared/types/db/dbExchange";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";

/**
 * Shared converter for create/update cases.
 */
const fromFirestore = (snapshot: QueryDocumentSnapshot<FsExchange>): DbExchange => ({
  id:      snapshot.id,
  name:    snapshot.data().name,
  website: snapshot.data().website,
});

export const createConverter = {
  toFirestore: (data: ExchangeData): Partial<FsExchange> => ({
    name:    data.name,
    website: data.website,
    // special fields
    ...withCreatedAt(),
    ...withUpdatedAt(),
  }),
  fromFirestore,
};

export const updateConverter = {
  toFirestore: (data: ExchangeData): Partial<FsExchange> => ({
    name:    data.name,
    website: data.website,
    // special fields
    ...withUpdatedAt(),
  }),
  fromFirestore,
};

export const deleteConverter = {
  toFirestore: () => ({
    // special fields
    ...withDeletedAt(),
  }),
  fromFirestore: () => {},
};

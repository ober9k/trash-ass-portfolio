import type { FsAsset } from "@/types/asset";
import { withCreatedAt, withDeletedAt, withUpdatedAt } from "@/utils/converterUtils";
import type { AssetData } from "@shared/schemas/assetSchema";
import type { DbAsset } from "@shared/types/db/dbAsset";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";

/**
 * Shared converter for create/update cases.
 */
const fromFirestore = (snapshot: QueryDocumentSnapshot<FsAsset>): DbAsset => ({
  id:     snapshot.id,
  apiId:  snapshot.data().apiId,
  name:   snapshot.data().name,
  ticker: snapshot.data().ticker,
});

export const createConverter = {
  toFirestore: (data: AssetData): Partial<FsAsset> => ({
    apiId:  data.apiId,
    name:   data.name,
    ticker: data.ticker,
    // special fields
    ...withCreatedAt(),
    ...withUpdatedAt(),
  }),
  fromFirestore,
};

export const updateConverter = {
  toFirestore: (data: AssetData): Partial<FsAsset> => ({
    apiId:  data.apiId,
    name:   data.name,
    ticker: data.ticker,
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

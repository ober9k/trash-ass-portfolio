import type { FsAsset } from "@/types/asset";
import type { AssetData } from "@shared/schemas/assetSchema";
import type { DbAsset } from "@shared/types/db/dbAsset";
import type { Ticker } from "@shared/types/ticker";
import type { FirestoreDataConverter, WithFieldValue } from "firebase-admin/firestore";
import { FieldValue, QueryDocumentSnapshot } from "firebase-admin/firestore";

/**
 * Shared converter for create/update cases.
 */
const fromFirestore = (snapshot: QueryDocumentSnapshot<FsAsset>): DbAsset => ({
  id:     snapshot.id,
  apiId:  snapshot.data().apiId,
  name:   snapshot.data().name,
  ticker: snapshot.data().ticker as Ticker,
});

export const createConverter: FirestoreDataConverter<AssetData> = {
  toFirestore: (data: WithFieldValue<AssetData>) => ({
    ...data,
    deleted:   false, // handle delete field too
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }),
  fromFirestore,
};

export const updateConverter: FirestoreDataConverter<AssetData> = {
  toFirestore: (data: WithFieldValue<AssetData>) => ({
    ...data,
    deleted:   false, // handle delete field too
    updatedAt: FieldValue.serverTimestamp(),
  }),
  fromFirestore,
};

export const deleteConverter: FirestoreDataConverter<AssetData> = {
  toFirestore: () => ({
    deleted:   true,
    deletedAt: FieldValue.serverTimestamp(),
  }),
  fromFirestore,
};

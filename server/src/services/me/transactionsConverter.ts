import type { FsTransaction } from "@/types/me/transaction";
import { parseTimestamp, withCreatedAt, withDeletedAt, withUpdatedAt } from "@/utils/converterUtils";
import type { TransactionData, UserTransactionData } from "@shared/schemas/transactionSchema";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";

/**
 * Shared converter for create/update cases.
 */
const fromFirestore = (snapshot: QueryDocumentSnapshot<FsTransaction>): TransactionData => ({
  assetId:     snapshot.data().assetId,
  type:        snapshot.data().type,
  price:       snapshot.data().price,
  quantity:    snapshot.data().quantity,
  fee:         snapshot.data().fee,
  value:       snapshot.data().value,
  purchasedAt: parseTimestamp(snapshot.data().purchasedAt).toISOString(),
});

export const createConverter = {
  toFireStore: (data: UserTransactionData): Partial<FsTransaction> => {
    return {
      assetId:  data.assetId,
      userId:   data.userId,
      type:     data.type,
      price:    data.price,
      quantity: data.quantity,
      fee:      data.fee,
      value:    data.value,
      // special fields
      ...withCreatedAt(),
      ...withUpdatedAt(),
    };
  },
  fromFirestore,
};

export const updateConverter = {
  toFireStore: (data: UserTransactionData): Partial<FsTransaction> => {
    return {
      // skip `userId` and `assetId` for update
      type:     data.type,
      price:    data.price,
      quantity: data.quantity,
      fee:      data.fee,
      value:    data.value,
      // special fields
      ...withUpdatedAt(),
    };
  },
  fromFirestore,
};

export const deleteConverter = {
  toFireStore: (): Partial<FsTransaction> => {
    return {
      // special fields
      ...withDeletedAt(),
    };
  },
  fromFirestore,
};

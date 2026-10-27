import { FieldValue, Timestamp } from "firebase-admin/firestore";

export const withCreatedAt = () => ({
  createdAt: FieldValue.serverTimestamp(),
  deletedAt: null,
});

export const withUpdatedAt = () => ({
  updatedAt: FieldValue.serverTimestamp(),
  deletedAt: null,
});

export const withDeletedAt = () => ({
  deletedAt: FieldValue.serverTimestamp(),
});

export function parseTimestamp(timestamp: Timestamp | FieldValue): Date {
  if (!(timestamp instanceof Timestamp)) {
    throw new Error("Unexpected value for `timestamp`.");
  }

  return timestamp.toDate();
}

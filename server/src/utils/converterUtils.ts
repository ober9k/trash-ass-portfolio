import { FieldValue } from "firebase-admin/firestore";

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

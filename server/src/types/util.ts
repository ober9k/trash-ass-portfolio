import type { FieldValue, Timestamp } from "firebase-admin/firestore";

export type CreatedAt = Timestamp | FieldValue;
export type UpdatedAt = Timestamp | FieldValue;
export type DeletedAt = Timestamp | FieldValue | null;

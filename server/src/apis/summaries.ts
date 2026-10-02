import { firestore } from "@/firebase";
import { FirestoreError, getErrorType } from "@/models/firestoreError";
import type { DbSummary } from "@shared/types/db/dbSummary";

function toSummary(doc): DbSummary {
  return {
    id:        doc.id,
    assetId:   doc.data().assetId, /* used for grouping */
    apiId:     doc.data().apiId,
    quantity:  doc.data().quantity,
    fee:       doc.data().fee,
    value:     doc.data().total,
    updatedAt: doc.data().updatedAt.toDate(),
  };
}

/**
 * Return all summaries.
 * Not recommended for use as the asset is not returned.
 */
export async function fetchSummaries(): Promise<DbSummary[]> {
  try {
    const ref = firestore.collection("summaries");
    const res = await ref.get();
    return res.docs.map(toSummary);
  }
  catch (error) {
    // just assume... don't care for now
    throw new FirestoreError(parseInt(error.code), getErrorType(parseInt(error.code)), error.message );
  }
}

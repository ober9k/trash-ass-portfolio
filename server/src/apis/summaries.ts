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

/**
 * Return all linked transactions for the specified asset.
 * @param assetId
 */
export async function fetchSummaryByAssetId(assetId: string): Promise<DbSummary> {
  try {
    const ref = firestore.collection("summaries").where("assetId", "==", assetId).limit(1);
    const snapshot = await ref.get();

    if (snapshot.empty) {
      /* TODO: handle properly */
      throw Error("Asset with given `assetId` not found.")
    }

    const [ doc ] = snapshot.docs;

    return toSummary(doc);
  }
  catch (error) {
    // just assume... don't care for now
    throw new FirestoreError(parseInt(error.code), getErrorType(parseInt(error.code)), error.message );
  }
}

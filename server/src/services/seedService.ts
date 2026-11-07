import { mappedAssets } from "@/data/mock/rawAssets";
import { mappedExchanges } from "@/data/mock/rawExchanges";
import { mappedTransactions } from "@/data/mock/rawTransactions";
import { firestore } from "@/firebase";
import { createFixedAsset } from "@/services/assetsService";
import { createFixedExchange } from "@/services/exchangesService";
import { addUserSummary } from "@/services/me/summariesService";
import { Timestamp } from "firebase-admin/firestore";

const userId = "XXX";
const type = "buy";

function getEmptySummary() {
  return {
    quantity:     0,
    fee:          0,
    initialValue: 0,
  }
}

function accumulateSummary(acc, cur) {
  return {
    quantity:     acc.quantity + cur.quantity,
    fee:          acc.fee + cur.fee,
    initialValue: acc.initialValue + cur.initialValue,
  };
}

export async function seedAssets() {
  const assets = mappedAssets;
  const savedAssets = [];

  for (let asset of assets) {
    const { id, apiId, name, ticker } = asset;
    const res = await createFixedAsset(id, { apiId, name, ticker, deleted: false });
    savedAssets.push(res);
    console.log(`Added asset with ID: ${res.id}`);
  }

  return {
    exchanges: savedAssets,
  };
}

export async function seedExchanges() {
  const exchanges = mappedExchanges;
  const savedExchanges = [];

  for (let exchange of exchanges) {
    const { id, name, website } = exchange;
    const res = await createFixedExchange(id, { name, website, deleted: false });
    savedExchanges.push(res);
    console.log(`Added exchange with ID: ${res.id}`);
  }

  return {
    exchanges: savedExchanges,
  };
}

export async function seedSummaries(flush: boolean = false) {
  const summariesRef = firestore.collection("summaries");

  const transactions = mappedTransactions;
  const summaries = [];
  const savedSummaries = [];

  if (flush) {
    await firestore.recursiveDelete(summariesRef);
  }

  for (let { id, apiId, name, ticker } of mappedAssets) {
    const filteredTransactions = transactions
      .filter((t) => t.ticker.toString() === ticker);

    if (filteredTransactions.length === 0) continue;

    const accumulated = filteredTransactions
      .reduce((acc, cur) => accumulateSummary(acc, cur), getEmptySummary());

    summaries.push({ userId, assetId: id, apiId, ...accumulated });
  }

  for (let s of summaries) {
    const res = await addUserSummary(userId, s);
    savedSummaries.push(res);
    console.log(`Added summary with ID: ${res.id}`);
  }

  return {
    summaries: savedSummaries,
  };
}

export async function seedTransactions(flush: boolean = false) {
  const transactionsRef = firestore.collection("transactions");

  if (flush) {
    await firestore.recursiveDelete(transactionsRef);
  }

  for (let t of mappedTransactions) {
    const transaction = {
      userId:      userId,
      assetId:     mappedAssets.find((a) => a.ticker === t.ticker),
      type:        type,
      quantity:    t.quantity,
      price:       t.price,
      fee:         t.fee,
      total:       t.initialValue,
      purchasedAt: Timestamp.fromDate(t.purchasedAt),
    };

    const docRef = await transactionsRef.add(transaction);
    console.log('Added transaction with ID: ', docRef.id);
  }

  return [];
}

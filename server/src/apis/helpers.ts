import { mappedAssets } from "@/data/mock/rawAssets";
import { mappedExchanges } from "@/data/mock/rawExchanges";
import { createFixedAsset } from "@/services/assetsService";
import { createFixedExchange } from "@/services/exchangesService";

export async function seedTransactions() {
  return [];
}

export async function seedSummaries() {
  return {};
}

export async function seedAssets() {
  const assets = mappedAssets;
  const savedAssets = [];

  for (let asset of assets) {
    const { id, apiId, name, ticker } = asset;
    const res = await createFixedAsset(id, { apiId, name, ticker });
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
    const res = await createFixedExchange(id, { name, website });
    savedExchanges.push(res);
    console.log(`Added exchange with ID: ${res.id}`);
  }

  return {
    exchanges: savedExchanges,
  };
}

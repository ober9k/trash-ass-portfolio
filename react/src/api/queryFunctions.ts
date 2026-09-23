import { getInitialAuthState } from "@/firebase.ts";
import type { Asset } from "@shared/types/asset.ts";
import { type Portfolio, type PortfolioAsset, type PortfolioSummary } from "@shared/types/portfolio.ts";
import { type Transaction } from "@shared/types/transaction.ts";
import axios from "axios";

const RootApiPath = "http://localhost/"; /* TODO: .env instead */
const RootApiPort = "8080";              /* TODO: .env instead */

/**
 * Build standardised URL for API usage.
 */
export function buildApiUrl(...parts: string[]): string {
  const url =  new URL(RootApiPath);
  url.port = RootApiPort;
  url.pathname = ["api", ...parts].join("/");

  return url.toString();
}

export async function getAuthConfig() {
  const user = await getInitialAuthState();

  if (!user) {
    return {};
  }

  const idToken = await user.getIdToken(true);

  return {
    headers: {
      "Authorization": `Bearer ${idToken}`,
    },
  }
}

export async function fetchHello({ queryKey }: { queryKey: readonly string[] }): Promise<Portfolio> {
  const { data } = await axios.get(buildApiUrl(...queryKey), await getAuthConfig());
  return data as Portfolio;
}

export async function fetchPortfolioSummary({ queryKey }: { queryKey: readonly string[] }): Promise<PortfolioSummary> {
  const { data } = await axios.get(buildApiUrl(...queryKey));
  return data as PortfolioSummary;
}

export async function fetchPortfolioAssets({ queryKey }: { queryKey: readonly string[] }): Promise<Asset[]> {
  const { data } = await axios.get(buildApiUrl(...queryKey));
  return data as Asset[];
}

export async function fetchTransactions({ queryKey }: { queryKey: readonly string[] }): Promise<Transaction[]> {
  const { data } = await axios.get(buildApiUrl(...queryKey));
  return data as Transaction[];
}

export async function fetchPortfolioAsset({ queryKey }: { queryKey: readonly string[] }): Promise<PortfolioAsset> {
  const { data } = await axios.get(buildApiUrl(...queryKey));
  return data as PortfolioAsset;
}


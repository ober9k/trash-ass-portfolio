import { buildApiUrl } from "@/api/utils.ts";
import { getInitialAuthState } from "@/firebase.ts";
import type { Holding, Transaction, Portfolio } from "@shared/types/portfolio.ts";
import type { QueryKey } from "@tanstack/react-query";
import axios from "axios";

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

export async function fetchPortfolio({ queryKey }: { queryKey: readonly QueryKey[] }): Promise<Portfolio> {
  const { data } = await axios.get(buildApiUrl(queryKey));
  return data as Portfolio;
}

export async function fetchHoldings({ queryKey }: { queryKey: readonly QueryKey[] }): Promise<Holding[]> {
  const { data } = await axios.get(buildApiUrl(queryKey));
  return data as Holding[];
}

export async function fetchHoldingByTicker({ queryKey }: { queryKey: readonly QueryKey[] }): Promise<Holding> {
  const { data } = await axios.get(buildApiUrl(queryKey));
  return data as Holding;
}

export async function fetchHoldingTransactionsByTicker({ queryKey }: { queryKey: readonly QueryKey[] }): Promise<Transaction[]> {
  const { data } = await axios.get(buildApiUrl(queryKey));
  return data as Transaction[];
}


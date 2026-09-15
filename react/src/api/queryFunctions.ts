import { type Portfolio } from "@shared/types/portfolio.ts";
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

export async function fetchPortfolio({ queryKey }: { queryKey: readonly string[] }): Promise<Portfolio> {
  const { data } = await axios.get(buildApiUrl(...queryKey));
  return data as Portfolio;
}

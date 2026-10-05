import type { QueryKey } from "@tanstack/react-query";

export type KeyValue = { [key: string]: any };
export type ParsedQueryKey = [string[], KeyValue];

/**
 * Split parts from query key for use in building the API url+search.
 * @param queryKey
 */
function parseQueryKey(queryKey: QueryKey[]) {
  const reducerFn = (a: ParsedQueryKey, c: QueryKey) => {
    if (typeof c === "string") {
      a[0].push(c);
    }
    else if (c !== null && typeof c === "object") {
      a[1] = { ...a[1], ...c };
    }
    return a;
  };

  return queryKey.reduce<ParsedQueryKey>(reducerFn, [[], {}]);
}

const RootApiPath = "http://localhost/"; /* TODO: .env instead */
const RootApiPort = "8080";              /* TODO: .env instead */

/**
 * Build standardised URL for API usage.
 */
export function buildApiUrl(parts: string[] = [], search: { [key: string]: string | number } = {}): string {
  const url = new URL(RootApiPath);
  url.port = RootApiPort;
  url.pathname = ["api", ...parts].join("/");

  Object.entries(search).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value.toString());
    }
  });

  return url.toString();
}

/**
 * Build standardised URL for API usage from the QueryKey.
 */
export function buildApiUrlFromQueryKey(queryKey: QueryKey[]): string {
  const [ parts, search ] = parseQueryKey(queryKey);
  return buildApiUrl(parts, search);
}

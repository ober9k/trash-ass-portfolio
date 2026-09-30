export type KeyValue = { [key: string]: any };
export type QueryKey = (string | KeyValue)[];
export type ParsedQueryKey = [string[], KeyValue];

/**
 * Split parts from query key for use in building the API url+search.
 * @param queryKey
 */
function parseQueryKey(queryKey: QueryKey[]) {
  const reducerFn = (a, c) => {
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
export function buildApiUrl(queryKey: QueryKey[]): string {
  const [ pathParts, searchParts ] = parseQueryKey(queryKey);

  const url = new URL(RootApiPath);
  url.port = RootApiPort;
  url.pathname = ["api", ...pathParts].join("/");

  Object.entries(searchParts).forEach(([ entry, value ]) => {
    url.searchParams.set(entry, value);
  });

  return url.toString();
}

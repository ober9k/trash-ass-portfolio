import type { TransactionsLoaderProps } from "@/api/loaders.ts";
import { getRouteApi } from "@tanstack/react-router";

function TransactionsPage() {
  const { transactions }: TransactionsLoaderProps = getRouteApi("/transactions/$tokenId").useLoaderData();

  return (
    <>
      <h1>Transactions</h1>
      TBD.
    </>
  );
}

export default TransactionsPage;

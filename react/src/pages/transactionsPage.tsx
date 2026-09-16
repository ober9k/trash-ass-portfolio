import type { TransactionsLoaderProps } from "@/api/loaders.ts";
import TransactionDisplay from "@/components/transactions/transactionDisplay.tsx";
import { getRouteApi } from "@tanstack/react-router";

function TransactionsPage() {
  const { transactions }: TransactionsLoaderProps = getRouteApi("/transactions/$tokenId").useLoaderData();

  return (
    <>
      <h1>Transactions</h1>
      {transactions.map((transaction, key) => (
        <TransactionDisplay transaction={transaction} key={key} />
      ))}
    </>
  );
}

export default TransactionsPage;

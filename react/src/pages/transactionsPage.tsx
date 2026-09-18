import type { TransactionsLoaderProps } from "@/api/loaders.ts";
import TransactionDisplay from "@/components/transactions/transactionDisplay.tsx";
import TransactionSummary from "@/components/transactions/transactionSummary.tsx";
import { getRouteApi, Link } from "@tanstack/react-router";

function TransactionsPage() {
  const { transactions, transactionTotal }: TransactionsLoaderProps = getRouteApi("/transactions/$tokenId").useLoaderData();

  return (
    <>
      <header className={"flex gap-2 p-1 bg-gray-300 border-b border-gray-300"}>
        <div className={"py-2 px-4 font-medium text-md"}>
          <Link to={"/"}>&lt;</Link>
        </div>
        <div className={"flex-grow py-2 px-4 font-medium"}>
          <h3 className={"text-center text-gray-700 font-bold text-md"}>
            Transactions
          </h3>
        </div>
        <div className={"py-2 px-4 font-medium text-md"}>
          <Link to={"/"}>⋮</Link>
        </div>
      </header>
      <div className={"p-2"}>
        <TransactionSummary transactionTotal={transactionTotal} />
        <h2 className={"px-4 py-1 uppercase text-sm"}>Transactions</h2>
        {transactions.map((transaction, key) => (
          <TransactionDisplay transaction={transaction} key={key} />
        ))}
      </div>
    </>
  );
}

export default TransactionsPage;

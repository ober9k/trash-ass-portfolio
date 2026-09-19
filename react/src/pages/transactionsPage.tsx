import type { TransactionsLoaderProps } from "@/api/loaders.ts";
import NavigationMenu from "@/components/layout/navigationMenu";
import TokenIcon from "@/components/tokens/tokenIcon";
import TransactionDisplay from "@/components/transactions/transactionDisplay.tsx";
import TransactionSummary from "@/components/transactions/transactionSummary.tsx";
import { getRouteApi, Link } from "@tanstack/react-router";
import { ArrowLeft, Menu } from "lucide-react";

function TransactionsPage() {
  const { transactions, transactionTotal }: TransactionsLoaderProps = getRouteApi("/transactions/$tokenId").useLoaderData();

  const leftItem = (
    <Link to={"/"}><ArrowLeft size={20} /></Link>
  );

  const rightItem = (
    <Link to={"/"}><Menu size={20} /></Link>
  );

  return (
    <>
      <NavigationMenu leftItem={leftItem} rightItem={rightItem}>
        <TokenIcon asset={transactionTotal} size="sm" />
        {transactionTotal.name}
      </NavigationMenu>
      <div className={"p-2"}>
        <TransactionSummary transactionTotal={transactionTotal} />
        <h2 className={"px-4 uppercase text-sm"}>Transactions</h2>
        {transactions.map((transaction, key) => (
          <TransactionDisplay transaction={transaction} key={key} />
        ))}
      </div>
    </>
  );
}

export default TransactionsPage;

import type { TransactionsLoaderProps } from "@/api/loaders.ts";
import AssetIcon from "@/components/assets/assetIcon.tsx";
import NavigationMenu from "@/components/layout/navigationMenu";
import TransactionDisplay from "@/components/transactions/transactionDisplay.tsx";
import TransactionSummary from "@/components/transactions/transactionSummary.tsx";
import type { AltAsset } from "@shared/types/asset.ts";
import { getRouteApi, Link } from "@tanstack/react-router";
import { ArrowLeft, Menu } from "lucide-react";

function TransactionsPage() {
  const { transactions: transactionsX, portfolioAsset }: TransactionsLoaderProps = getRouteApi("/transactions/$tokenId").useLoaderData();

  const [ transactionsY ] = transactionsX; /* temporary to keep page working */
  const transactions = transactionsY.transactions; /* temporary to keep page working */

  const leftItem = (
    <Link to={"/"}><ArrowLeft size={20} /></Link>
  );

  const rightItem = (
    <Link to={"/"}><Menu size={20} /></Link>
  );

  const tokenIconAsset = { name: portfolioAsset.name, ticker: portfolioAsset.ticker } as AltAsset;

  return (
    <>
      <NavigationMenu leftItem={leftItem} rightItem={rightItem}>
        <AssetIcon asset={tokenIconAsset} size={"sm"} />
        {portfolioAsset.name}
      </NavigationMenu>
      <div className={"p-2"}>
        <TransactionSummary asset={portfolioAsset} />
        <h2 className={"px-4 uppercase text-sm"}>Transactions</h2>
        {transactions.map((transaction, key) => (
          <TransactionDisplay transaction={transaction} key={key} />
        ))}
      </div>
    </>
  );
}

export default TransactionsPage;

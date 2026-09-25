import type { HoldingLoaderProps } from "@/api/loaders.ts";
import AssetIcon from "@/components/assets/assetIcon.tsx";
import NavigationMenu from "@/components/layout/navigationMenu";
import TransactionCard from "@/components/transactions/transactionCard.tsx";
import TransactionSummary from "@/components/transactions/transactionSummary.tsx";
import { getRouteApi, Link } from "@tanstack/react-router";
import { ArrowLeft, Menu } from "lucide-react";

function TransactionsPage() {
  const { holding, transactions }: HoldingLoaderProps = getRouteApi("/transactions/$tokenId").useLoaderData();
  const { asset } = holding;

  const leftItem = (
    <Link to={"/"}><ArrowLeft size={20} /></Link>
  );

  const rightItem = (
    <Link to={"/"}><Menu size={20} /></Link>
  );

  return (
    <>
      <NavigationMenu leftItem={leftItem} rightItem={rightItem}>
        <AssetIcon asset={asset} size={"sm"} />
        {holding.asset.name}
      </NavigationMenu>
      <div className={"p-2"}>
        <TransactionSummary holding={holding} />
        <h2 className={"px-4 uppercase text-sm"}>Transactions</h2>
        {transactions.map((transaction, key) => (
          <TransactionCard asset={asset} transaction={transaction} key={key} />
        ))}
      </div>
    </>
  );
}

export default TransactionsPage;

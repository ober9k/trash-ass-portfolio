import type { HoldingLoaderProps } from "@/api/loaders.ts";
import AssetIcon from "@/components/assets/assetIcon.tsx";
import NavigationMenu from "@/components/layout/navigationMenu";
import PeriodToggle from "@/components/miscellaneous/periodToggle.tsx";
import TransactionsCard from "@/components/transactions/transactionsCard";
import TransactionSummary from "@/components/transactions/transactionSummary.tsx";
import type { Period } from "@shared/types/period.ts";
import { getRouteApi, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Menu } from "lucide-react";

function TransactionsPage() {
  const { holding, transactions }: HoldingLoaderProps = getRouteApi("/transactions/$tokenId").useLoaderData();
  const { asset } = holding;
  const navigate = useNavigate();

  const leftItem = (
    <Link to={"/"}><ArrowLeft size={20} /></Link>
  );

  const rightItem = (
    <Link to={"/"}><Menu size={20} /></Link>
  );

  const onToggle = (period: Period) => {
    navigate({
      search: () => ({ period: period.toString() }),
    });
  };

  return (
    <>
    <article style={{ backgroundColor: "#121212" }} className="h-dvh">
      <NavigationMenu leftItem={leftItem} rightItem={rightItem}>
        <AssetIcon asset={asset} size={"sm"} />
        {holding.asset.name}
      </NavigationMenu>
      <article className="flex flex-col gap-4 p-2 m-2">
        <TransactionSummary holding={holding} />
        <PeriodToggle onToggle={onToggle} />
        <TransactionsCard asset={asset} transactions={transactions} />
      </article>
    </article>
    </>
  );
}

export default TransactionsPage;

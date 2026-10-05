import type { HoldingLoaderProps } from "@/api/loaders.ts";
import AssetIcon from "@/components/assets/assetIcon.tsx";
import NavigationMenu from "@/components/layout/navigationMenu";
import PeriodToggle from "@/components/miscellaneous/periodToggle.tsx";
import SummaryCard from "@/components/transactions/summaryCard";
import TransactionsCard from "@/components/transactions/transactionsCard";
import { Period } from "@shared/types/period.ts";
import { getRouteApi, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Menu } from "lucide-react";

function TransactionsPage() {
  const { holding, transactions }: HoldingLoaderProps = getRouteApi("/transactions/$tokenId").useLoaderData();
  const { asset } = holding;
  const { period } = getRouteApi("/transactions/$tokenId").useSearch();
  const router = useRouter();

  const leftItem = (
    <Link to={"/"}><ArrowLeft size={20} /></Link>
  );

  const rightItem = (
    <Link to={"/"}><Menu size={20} /></Link>
  );

  const onToggle = (period: string) => {
    const search = (period !== Period.All.toString())
      ? { period } : { period: undefined }; /* clear it for all */

    router.navigate({
      to: "/transactions/$tokenId",
      params: { tokenId: holding.asset.ticker },
      search: () => ({ ...search })
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
        <SummaryCard holding={holding} />
        <PeriodToggle period={period} onToggle={onToggle} />
        <TransactionsCard asset={asset} transactions={transactions} />
      </article>
    </article>
    </>
  );
}

export default TransactionsPage;

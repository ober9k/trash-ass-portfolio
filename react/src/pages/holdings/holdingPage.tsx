import type { HoldingLoaderProps } from "@/api/loaders.ts";
import AssetIcon from "@/components/assets/assetIcon.tsx";
import NavigationBar from "@/components/layout/navigationBar.tsx";
import PeriodToggle from "@/components/miscellaneous/periodToggle.tsx";
import SummaryCard from "@/components/transactions/summaryCard";
import TransactionsCard from "@/components/transactions/transactionsCard";
import { Urls } from "@/config/urls.ts";
import { Box, Fab, IconButton, Typography } from "@mui/material";
import { Period } from "@shared/types/period.ts";
import { getRouteApi, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, PlusIcon } from "lucide-react";

function HoldingPage() {
  const { holding, transactions }: HoldingLoaderProps = getRouteApi(Urls.Holding).useLoaderData();
  const { asset } = holding;
  const { period } = getRouteApi(Urls.Holding).useSearch();
  const router = useRouter();

  const leftSlot = (
    <IconButton size="large" color="inherit" edge="start" aria-label="back">
      <Link to={Urls.Portfolio}>
        <ArrowLeft />
      </Link>
    </IconButton>
  );

  const onToggle = (period: string) => {
    const search = (period !== Period.All.toString())
      ? { period } : { period: undefined }; /* clear it for all */

    router.navigate({
      to: Urls.Holding,
      params: { holdingId: holding.asset.id },
      search: () => ({ ...search })
    });
  };

  return (
    <>
    <article style={{ backgroundColor: "#121212" }} className="h-dvh">
      <NavigationBar leftSlot={leftSlot}>
        <Box className="mt-0.5 mr-1.5">
          <AssetIcon asset={asset} size="sm" />
        </Box>
        <Typography variant="h4" component="h4" className="text-lg">
          {holding.asset.name}
        </Typography>
      </NavigationBar>
      <article className="flex flex-col gap-4 p-2 m-2">
        <SummaryCard holding={holding} />
        <PeriodToggle period={period} onToggle={onToggle} />
        <TransactionsCard asset={asset} transactions={transactions} />
      </article>
      <Fab color="primary" aria-label="add" className="fixed right-8 bottom-8">
        <Link to={Urls.TransactionAdd} params={{ holdingId: asset.id }}>
          <PlusIcon />
        </Link>
      </Fab>
    </article>
    </>
  );
}

export default HoldingPage;

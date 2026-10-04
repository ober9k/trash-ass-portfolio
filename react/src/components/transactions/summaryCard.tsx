import AltCardHeader from "@/components/miscellaneous/altCardHeader";
import AssetDisplay from "@/components/utils/assetDisplay.tsx";
import CurrencyDisplay from "@/components/utils/currencyDisplay.tsx";
import GainDisplay from "@/components/utils/gainDisplay";
import PropertyDisplay from "@/components/utils/propertyDisplay.tsx";
import { Card, CardContent, Typography } from "@mui/material";
import type { Holding } from "@shared/types/portfolio.ts";

type Props = {
  holding: Holding,
};

function SummaryCard(props: Props) {
  const { holding } = props;
  const { asset, summary } = holding;

  const profitValue = summary.currentValue;

  return (
    <>
    <Card>
      <AltCardHeader title="Summary" />
      <CardContent className="pb-0">
        <Typography variant="h4" component="h4" className="pb-4 text-4xl">
          <CurrencyDisplay currentValue={profitValue} />
        </Typography>
        <Typography variant="h6" component="h6" className="text-sm">
          <GainDisplay currentValue={summary.currentValue} initialValue={summary.initialValue} />
        </Typography>
      </CardContent>
      <CardContent className="flex justify-left">
        <PropertyDisplay title={"Holdings"}>
          <AssetDisplay asset={asset} quantity={summary.quantity} />
        </PropertyDisplay>
        <PropertyDisplay title={"Market Value"}>
          <CurrencyDisplay currentValue={summary.currentValue} />
        </PropertyDisplay>
        <PropertyDisplay title={"Total Cost"}>
          <CurrencyDisplay currentValue={summary.initialValue} />
        </PropertyDisplay>
      </CardContent>
    </Card>
    </>
  );
}

export default SummaryCard;

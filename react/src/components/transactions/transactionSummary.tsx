import AssetDisplay from "@/components/utils/assetDisplay.tsx";
import CurrencyDisplay from "@/components/utils/currencyDisplay.tsx";
import PercentDisplay from "@/components/utils/percentDisplay.tsx";
import PropertyDisplay from "@/components/utils/propertyDisplay.tsx";
import type { PortfolioAsset } from "@shared/types/portfolio.ts";

type Props = {
  asset: PortfolioAsset,
};

function TransactionSummary(props: Props) {
  const { asset } = props;
  const { summary } = asset;

  const profitValue = summary.value - summary.total;
  const profitTitle = (profitValue > 0)
    ? "Total Profit"
    : "Total Loss";

  return (
    <>
      <article className={"m-2 p-2 flex gap-1 flex-col bg-gray-100 border-1 border-gray-300 rounded"}>
        <section className={"flex justify-center p-1"}>
          <PropertyDisplay title={profitTitle}>
            <CurrencyDisplay currentValue={profitValue} />
            <PercentDisplay currentValue={summary.value} purchaseValue={summary.total} />
          </PropertyDisplay>
        </section>
        <section className={"flex justify-center p-1"}>
          <PropertyDisplay title={"Holdings"}>
            <AssetDisplay asset={asset} quantity={summary.quantity} />
          </PropertyDisplay>
          <PropertyDisplay title={"Market Value"}>
            <CurrencyDisplay currentValue={summary.value} />
          </PropertyDisplay>
          <PropertyDisplay title={"Total Cost"}>
            <CurrencyDisplay currentValue={summary.total} />
          </PropertyDisplay>
        </section>
      </article>
    </>
  );
}

export default TransactionSummary;

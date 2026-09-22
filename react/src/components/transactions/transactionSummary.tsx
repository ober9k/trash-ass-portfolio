import AssetDisplay from "@/components/utils/assetDisplay.tsx";
import CurrencyDisplay from "@/components/utils/currencyDisplay.tsx";
import PercentDisplay from "@/components/utils/percentDisplay.tsx";
import PropertyDisplay from "@/components/utils/propertyDisplay.tsx";
import type { AltAsset } from "@shared/types/asset.ts";
import type { TransactionTotal } from "@shared/types/transaction.ts";

type Props = {
  transactionTotal: TransactionTotal,
};

function TransactionSummary(props: Props) {
  const { transactionTotal: summary } = props;

  const asset: AltAsset = {
    ticker:  summary.ticker, /* TODO: fix up name handling */
    name:    summary.name,   /* TODO: fix up name handling */
  };

  const profitValue = summary.marketValue - summary.totalValue;
  const profitTitle = (profitValue > 0)
    ? "Total Profit"
    : "Total Loss";

  return (
    <>
      <article className={"m-2 p-2 flex gap-1 flex-col bg-gray-100 border-1 border-gray-300 rounded"}>
        <section className={"flex justify-center p-1"}>
          <PropertyDisplay title={profitTitle}>
            <CurrencyDisplay currentValue={profitValue} />
            <PercentDisplay currentValue={summary.marketValue} purchaseValue={summary.totalValue} />
          </PropertyDisplay>
        </section>
        <section className={"flex justify-center p-1"}>
          <PropertyDisplay title={"Holdings"}>
            <AssetDisplay asset={asset} quantity={summary.quantity} />
          </PropertyDisplay>
          <PropertyDisplay title={"Market Value"}>
            <CurrencyDisplay currentValue={summary.marketValue} />
          </PropertyDisplay>
          <PropertyDisplay title={"Total Cost"}>
            <CurrencyDisplay currentValue={summary.totalValue} />
          </PropertyDisplay>
        </section>
      </article>
    </>
  );
}

export default TransactionSummary;

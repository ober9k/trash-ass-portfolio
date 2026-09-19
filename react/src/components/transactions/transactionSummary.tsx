import TokenIcon from "@/components/tokens/tokenIcon.tsx";
import CurrencyDisplay from "@/components/utils/currencyDisplay.tsx";
import PercentDisplay from "@/components/utils/percentDisplay.tsx";
import PropertyDisplay from "@/components/utils/propertyDisplay.tsx";
import TokenDisplay from "@/components/utils/tokenDisplay.tsx";
import type { Asset } from "@shared/types/asset.ts";
import type { TransactionTotal } from "@shared/types/transaction.ts";

type Props = {
  transactionTotal: TransactionTotal,
};

function TransactionSummary(props: Props) {
  const { transactionTotal: summary } = props;

  const token: Partial<Asset> = {
    token: summary.token,
    name:   summary.name,
  };

  const profitValue = summary.marketValue - summary.totalValue;
  const profitTitle = (profitValue > 0)
    ? "Total Profit"
    : "Total Loss";

  return (
    <>
      <article className={"m-2 p-2 flex gap-1 flex-col bg-gray-100 border-1 border-gray-300 rounded"}>
        <header className={"flex justify-center p-1"}>
          <TokenIcon asset={token} size="sm" />
          <h1 className={"ml-1 text-2xl"}>{summary.name}</h1>
        </header>
        <section className={"flex justify-center p-1"}>
          <PropertyDisplay title={profitTitle}>
            <CurrencyDisplay value={profitValue} />
            <PercentDisplay marketValue={summary.marketValue} purchaseValue={summary.totalValue} />
          </PropertyDisplay>
        </section>
        <section className={"flex justify-center p-1"}>
          <PropertyDisplay title={"Holdings"}>
            <TokenDisplay {...summary} />
          </PropertyDisplay>
          <PropertyDisplay title={"Market Value"}>
            <CurrencyDisplay value={summary.marketValue} />
          </PropertyDisplay>
          <PropertyDisplay title={"Total Cost"}>
            <CurrencyDisplay value={summary.totalValue} />
          </PropertyDisplay>
        </section>
      </article>
    </>
  );
}

export default TransactionSummary;

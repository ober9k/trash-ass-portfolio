import CurrencyDisplay from "@/components/utils/currencyDisplay.tsx";
import PercentDisplay from "@/components/utils/percentDisplay.tsx";
import PropertyDisplay from "@/components/utils/propertyDisplay.tsx";
import type { PortfolioSummary } from "@shared/types/portfolio.ts";

type Props = {
  summary: PortfolioSummary,
};

function SummaryCard(props: Props) {
  const { summary } = props;

  return (
    <>
      <article>
        <section className={"flex justify-center p-2"}>
          <PropertyDisplay title={"Market Value"}>
            <CurrencyDisplay currentValue={summary.currentValue} />
            <PercentDisplay currentValue={summary.currentValue} purchaseValue={summary.purchaseValue} />
          </PropertyDisplay>
        </section>
      </article>
    </>
  );
}

export default SummaryCard;

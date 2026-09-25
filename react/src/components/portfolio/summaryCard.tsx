import CurrencyDisplay from "@/components/utils/currencyDisplay.tsx";
import PercentDisplay from "@/components/utils/percentDisplay.tsx";
import PropertyDisplay from "@/components/utils/propertyDisplay.tsx";
import type { Portfolio } from "@shared/types/portfolio.ts";

type Props = {
  portfolio: Portfolio,
};

function SummaryCard(props: Props) {
  const { portfolio } = props;

  return (
    <>
      <article>
        <section className={"flex justify-center p-2"}>
          <PropertyDisplay title={"Market Value"}>
            <CurrencyDisplay currentValue={portfolio.currentValue} />
            <PercentDisplay currentValue={portfolio.currentValue} purchaseValue={portfolio.value} />
          </PropertyDisplay>
        </section>
      </article>
    </>
  );
}

export default SummaryCard;

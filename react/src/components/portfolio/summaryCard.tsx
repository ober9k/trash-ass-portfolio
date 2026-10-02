import CurrencyDisplay from "@/components/utils/currencyDisplay.tsx";
import PercentDisplay from "@/components/utils/percentDisplay.tsx";
import PropertyDisplay from "@/components/utils/propertyDisplay.tsx";
import type { Portfolio } from "@shared/types/portfolio.ts";

type Props = {
  portfolio: Portfolio,
};

function SummaryCard(props: Props) {
  const { portfolio } = props;

  const currentValue = portfolio?.currentValue ?? 0;
  const initialValue = portfolio?.value ?? 0; /* TODO: rename to initial value */

  return (
    <>
      <article>
        <section className={"flex justify-center p-2"}>
          <PropertyDisplay title={"Market Value"}>
            <CurrencyDisplay currentValue={currentValue} />
            <PercentDisplay currentValue={currentValue} initialValue={initialValue} />
          </PropertyDisplay>
        </section>
      </article>
    </>
  );
}

export default SummaryCard;

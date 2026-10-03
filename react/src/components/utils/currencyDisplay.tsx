import { Defaults } from "@/config/defaults.ts";
import { formatCurrency } from "@/utils/numberUtils.ts";
import { Currency } from "@shared/types/currency.ts";

type Props = {
  currentValue: number,
  currency?:    Currency,
}

function CurrencyDisplay(props: Props) {
  const { currency = Defaults.Currency, currentValue } = props;

  return (
    <>
      <span>
        {formatCurrency(currentValue, currency)} <span className={"font-thin"}>{currency.toUpperCase()}</span>
      </span>
    </>
  )
}

export default CurrencyDisplay;

import { Currency } from "@shared/types/currency.ts";

const DefaultCurrency = Currency.AUD; /* value used for now */

type Props = {
  currentValue:   number,
  currency?: Currency, /* no support yet for symbol */
}

function CurrencyDisplay(props: Props) {
  const { currency = DefaultCurrency, currentValue } = props;

  return (
    <>
      <span>
        ${currentValue.toFixed(2)} <span className={"font-thin"}>{currency.toUpperCase()}</span>
      </span>
    </>
  )
}

export default CurrencyDisplay;

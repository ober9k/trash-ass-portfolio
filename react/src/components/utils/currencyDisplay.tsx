import { Currency } from "@shared/types/currency.ts";

const DefaultCurrency = Currency.AUD; /* value used for now */

type Props = {
  currency?: Currency, /* no support yet for symbol */
  value:   number,
}

function CurrencyDisplay(props: Props) {
  const { currency = DefaultCurrency, value } = props;

  return (
    <>
      <span>
        ${value.toFixed(2)} {currency.toUpperCase()}
      </span>
    </>
  )
}

export default CurrencyDisplay;

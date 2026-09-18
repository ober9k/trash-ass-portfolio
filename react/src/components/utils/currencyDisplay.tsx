const defaultCurrency = "aud"; /* value used for now */

type Props = {
  symbol?: "usd" | "aud", /* no support yet for symbol */
  value:   number,
}

function CurrencyDisplay(props: Props) {
  const { symbol = defaultCurrency, value } = props;

  return (
    <>
      <span>
        ${value.toFixed(2)} {symbol.toUpperCase()}
      </span>
    </>
  )
}

export default CurrencyDisplay;

import type { SymbolType } from "@shared/types/token.ts";

type Props = {
  symbol:   SymbolType,
  name:     string,
  quantity: number,
}

function TokenDisplay(props: Props) {
  const { symbol, name, quantity } = props;

  return (
    <>
      <span className={"[&_abbr]:no-underline [&_abbr]:border-b [&_abbr]:border-gray-400 [&_abbr]:border-dashed"}>
        {quantity.toFixed(4)} <abbr title={name}>{symbol.toUpperCase()}</abbr>
      </span>
    </>
  )
}

export default TokenDisplay;

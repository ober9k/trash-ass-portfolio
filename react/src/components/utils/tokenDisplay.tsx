import { Token } from "@shared/types/token.ts";

type Props = {
  token:    Token,
  name?:    string,
  quantity: number,
}

function TokenDisplay(props: Props) {
  const { token, name = "", quantity } = props; /* fix up name handling */

  return (
    <>
      <span className={"[&_abbr]:no-underline [&_abbr]:border-b [&_abbr]:border-gray-400 [&_abbr]:border-dashed"}>
        {quantity.toFixed(4)} <abbr title={name}>{token.toUpperCase()}</abbr>
      </span>
    </>
  )
}

export default TokenDisplay;

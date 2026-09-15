import TokenIcon from "@/components/tokens/tokenIcon.tsx";
import type { Token } from "@shared/types/token.ts";

function parseValue(value: number): string {
  return parseFloat(value.toFixed(2)).toLocaleString();
}

type Props = {
  token: Token,
};

function TokenDisplay(props: Props) {
  const { token } = props;

  return (
    <>
      <article className={"flex gap-2 m-2 p-2 border border-gray-200 rounded bg-gray-100"}>
        <section>
          <TokenIcon token={token} />
        </section>
        <section className={"grow"}>
          <h3 className={"text-md font-medium"}>{token.name}</h3>
          <p className={"leading-none"}>
            <small className={"text-xs font-medium text-gray-500"}>
              {parseValue(token.quantity)} {token.symbol.toUpperCase()}
            </small>
          </p>
        </section>
        <section>
          <h3 className={"text-md font-medium text-right"}>$1,234.00</h3>
        </section>
      </article>
    </>
  );
}

export default TokenDisplay;

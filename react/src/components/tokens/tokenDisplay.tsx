import TokenIcon from "@/components/tokens/tokenIcon.tsx";
import type { PortfolioAsset } from "@shared/types/portfolio.ts";
import type { Token } from "@shared/types/token.ts";
import { Link } from "@tanstack/react-router";

function parseValue(value: number): string {
  return parseFloat(value.toFixed(2)).toLocaleString();
}

type Props = {
  asset: PortfolioAsset,
};

function TokenDisplay(props: Props) {
  const { asset } = props;
  const { name, ticker, summary } = asset;

  const tokenIconAsset = { name, token: ticker.toLowerCase() as Token };

  return (
    <>
      <article className={"flex gap-2 m-2 p-2 border border-gray-200 rounded bg-gray-100"}>
        <section>
          <TokenIcon asset={tokenIconAsset} />
        </section>
        <section className={"grow"}>
          <h3 className={"text-md font-medium"}>
            <Link to={"/transactions/$tokenId"} params={{ tokenId: ticker.toLowerCase() }}>
              {asset.name}
            </Link>
          </h3>
          <p className={"leading-none"}>
            <small className={"text-xs font-medium text-gray-500"}>
              {parseValue(summary.quantity)} {ticker}
            </small>
          </p>
        </section>
        <section>
          <h3 className={"text-md font-medium text-right"}>${parseValue(summary.value)}</h3>
        </section>
      </article>
    </>
  );
}

export default TokenDisplay;

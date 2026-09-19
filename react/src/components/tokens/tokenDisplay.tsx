import TokenIcon from "@/components/tokens/tokenIcon.tsx";
import type { Asset } from "@shared/types/asset.ts";
import { Link } from "@tanstack/react-router";

function parseValue(value: number): string {
  return parseFloat(value.toFixed(2)).toLocaleString();
}

type Props = {
  asset: Asset,
};

function TokenDisplay(props: Props) {
  const { asset } = props;

  return (
    <>
      <article className={"flex gap-2 m-2 p-2 border border-gray-200 rounded bg-gray-100"}>
        <section>
          <TokenIcon asset={asset} />
        </section>
        <section className={"grow"}>
          <h3 className={"text-md font-medium"}>
            <Link to={"/transactions/$tokenId"} params={{ tokenId: asset.token }}>
              {asset.name}
            </Link>
          </h3>
          <p className={"leading-none"}>
            <small className={"text-xs font-medium text-gray-500"}>
              {parseValue(asset.quantity)} {asset.token.toUpperCase()}
            </small>
          </p>
        </section>
        <section>
          <h3 className={"text-md font-medium text-right"}>${parseValue(asset.value)}</h3>
        </section>
      </article>
    </>
  );
}

export default TokenDisplay;

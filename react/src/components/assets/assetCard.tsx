import AssetIcon from "@/components/assets/assetIcon.tsx";
import AssetDisplay from "@/components/utils/assetDisplay.tsx";
import CurrencyDisplay from "@/components/utils/currencyDisplay.tsx";
import type { AltAsset } from "@shared/types/asset.ts";
import type { PortfolioAsset } from "@shared/types/portfolio.ts";
import { Link } from "@tanstack/react-router";

type Props = {
  asset: PortfolioAsset,
};

function AssetCard(props: Props) {
  const { asset } = props;
  const { ticker, summary } = asset;

  const altAsset = { id: "temp", ticker: asset.ticker, name: asset.name } as AltAsset;

  return (
    <>
      <article className={"flex gap-2 m-2 p-2 border border-gray-200 rounded bg-gray-100"}>
        <section>
          <AssetIcon asset={altAsset} />
        </section>
        <section className={"grow"}>
          <h3 className={"text-md font-medium"}>
            <Link to={"/transactions/$tokenId"} params={{ tokenId: ticker.toLowerCase() }}>
              {asset.name}
            </Link>
          </h3>
          <p className={"leading-none"}>
            <small className={"text-xs font-medium text-gray-500"}>
              <AssetDisplay asset={altAsset} quantity={summary.quantity} />
            </small>
          </p>
        </section>
        <section>
          <h4 className={"text-right text-sm font-bold"}>
            <CurrencyDisplay currentValue={summary.value} />
            {/*<PercentDisplay currentValue={summary.value} purchaseValue={summary.total} />*/}
          </h4>
        </section>
      </article>
    </>
  );
}

export default AssetCard;

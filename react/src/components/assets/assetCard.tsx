import AssetIcon from "@/components/assets/assetIcon.tsx";
import AssetDisplay from "@/components/utils/assetDisplay.tsx";
import CurrencyDisplay from "@/components/utils/currencyDisplay.tsx";
import PercentDisplay from "@/components/utils/percentDisplay.tsx";
import type { Holding } from "@shared/types/portfolio.ts";
import { Link } from "@tanstack/react-router";

type Props = {
  holding: Holding,
};

function AssetCard(props: Props) {
  const { holding } = props;
  const { asset, summary } = holding;

  return (
    <>
      <article className={"flex gap-2 m-2 p-2 border border-gray-200 rounded bg-gray-100"}>
        <section>
          <AssetIcon asset={asset} />
        </section>
        <section className={"grow"}>
          <h3 className={"text-md font-medium"}>
            <Link to={"/transactions/$tokenId"} params={{ tokenId: asset.ticker.toLowerCase() }}>
              {asset.name}
            </Link>
          </h3>
          <p className={"leading-none"}>
            <small className={"text-xs font-medium text-gray-500"}>
              <AssetDisplay asset={asset} quantity={summary.quantity} />
            </small>
          </p>
        </section>
        <section>
          <h4 className={"text-right text-sm font-bold"}>
            <CurrencyDisplay currentValue={summary.currentValue} />
            <PercentDisplay currentValue={summary.currentValue} purchaseValue={summary.value} />
          </h4>
        </section>
      </article>
    </>
  );
}

export default AssetCard;

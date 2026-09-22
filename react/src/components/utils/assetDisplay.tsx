import type { AltAsset } from "@shared/types/asset.ts";

type Props = {
  asset:    AltAsset,
  quantity: number,
}

/**
 * TODO: this needs some renaming to suit the situation of an asset/display/etc.
 */
function AssetDisplay(props: Props) {
  const { asset, quantity } = props;

  return (
    <>
      <span className={"[&_abbr]:no-underline [&_abbr]:border-b [&_abbr]:border-gray-400 [&_abbr]:border-dashed"}>
        {quantity.toFixed(4)} <abbr title={asset.ticker}>{asset.ticker}</abbr>
      </span>
    </>
  );
}

export default AssetDisplay;

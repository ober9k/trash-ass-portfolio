import AssetCard from "@/components/assets/assetCard.tsx";
import type { PortfolioAsset } from "@shared/types/portfolio.ts";

type Props = {
  assets: PortfolioAsset[],
}

function AssetCardList(props: Props) {
  const { assets } = props;

  return (
    <>
      {assets.map((asset, key) => (
        <AssetCard asset={asset} key={key} />
      ))}
    </>
  );
}

export default AssetCardList;

import AssetCard from "@/components/assets/assetCard.tsx";
import type { Holding } from "@shared/types/portfolio.ts";

type Props = {
  holdings: Holding[],
}

function AssetCardList(props: Props) {
  const { holdings } = props;

  return (
    <>
      {holdings.map((holding, key) => (
        <AssetCard holding={holding} key={key} />
      ))}
    </>
  );
}

export default AssetCardList;

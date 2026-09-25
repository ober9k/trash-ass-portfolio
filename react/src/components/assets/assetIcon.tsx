import type { IconSize } from "@/utils/iconUtils.ts";
import { defaultSize, getIconClass, getIconUrl } from "@/utils/iconUtils.ts";
import type { Asset } from "@shared/types/portfolio.ts";

type Props = {
  asset: Asset, /* to be changed to just `Asset` */
  size?: IconSize,
};

function AssetIcon(props: Props) {
  const { asset, size = defaultSize } = props;
  const iconUrl = getIconUrl(asset.ticker);

  return (
    <img className={`${getIconClass(size)} rounded-full`} src={iconUrl} alt={asset.name} />
  );
}

export default AssetIcon;

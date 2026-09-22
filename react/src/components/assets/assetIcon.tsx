import type { IconSize } from "@/utils/iconUtils.ts";
import { defaultSize, getIconClass, getIconUrl } from "@/utils/iconUtils.ts";
import type { AltAsset } from "@shared/types/asset.ts";

type Props = {
  asset: AltAsset, /* to be changed to just `Asset` */
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

import { DefaultIconSize, getIconClass, getIconUrl } from "@/utils/iconUtils.ts";
import type { IconSize } from "@/utils/iconUtils.ts";
import { type Asset } from "@shared/types/asset.ts";

type Props = {
  asset: Partial<Asset>,
  size?: IconSize,
};

function TokenIcon(props: Props) {
  const { asset, size = DefaultIconSize } = props;
  const { token, name } = asset;
  const iconUrl = getIconUrl(token);

  return (
    <>
      <img className={`m-1 ${getIconClass(size)} rounded-full`} src={iconUrl as string} alt={name} />
    </>
  );
}

export default TokenIcon;

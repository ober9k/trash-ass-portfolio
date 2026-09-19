import { Symbol, type Token } from "@shared/types/token.ts";
import { DefaultIconSize, getIconClass, getIconUrl, type IconSize } from "@/utils/icon.ts";

type Props = {
  token: Partial<Token>,
  size?: IconSize,
};

function TokenIcon(props: Props) {
  const { symbol, name } = token;
  const iconUrl = getIconUrl(symbol);
  const { symbol, size = DefaultIconSize } = props;

  return (
    <>
      <img className={`m-1 ${getIconClass(size)} rounded-full`} src={iconUrl as string} alt={name} />
    </>
  );
}

export default TokenIcon;

import adaUrl from "@/assets/icons/ada.png";
import dogeUrl from "@/assets/icons/doge.png";
import hypeUrl from "@/assets/icons/hype.png";
import neoUrl from "@/assets/icons/neo.png";
import pepeUrl from "@/assets/icons/pepe.png";
import vetUrl from "@/assets/icons/vet.png";
import xlmUrl from "@/assets/icons/xlm.png";
import zbcnUrl from "@/assets/icons/zbcn.png";
import zecUrl from "@/assets/icons/zec.png";
import { Symbol, type Token } from "@shared/types/token.ts";

type Size = "xs" | "sm" | "md" | "lg";
const defaultSize: Size = "md"; /* value used for now */

function getIconUrl(symbol: string) {
  switch (symbol) {
    case Symbol.ADA:  return adaUrl;
    case Symbol.DOGE: return dogeUrl;
    case Symbol.HYPE: return hypeUrl;
    case Symbol.NEO:  return neoUrl;
    case Symbol.PEPE: return pepeUrl;
    case Symbol.VET:  return vetUrl;
    case Symbol.XLM:  return xlmUrl;
    case Symbol.ZBCN: return zbcnUrl;
    case Symbol.ZEC:  return zecUrl;
    default: throw Error("Unexpected `Symbol` for `iconUrl`.");
  }
}

function getSizeClass(size: Size): string {
  switch (size) {
    case "xs": return "size-4";
    case "sm": return "size-6";
    case "md": return "size-8";
    case "lg": return "size-10";
    default: throw Error("Unexpected value for `size`.");
  }
}

type Props = {
  token: Partial<Token>,
  size:  Size,
};

function TokenIcon(props: Props) {
  const { token, size = defaultSize } = props;
  const { symbol, name } = token;
  const iconUrl = getIconUrl(symbol);

  return (
    <>
      <img className={`m-1 ${getSizeClass(size as Size)} rounded-full`} src={iconUrl} alt={name} />
    </>
  );
}

export default TokenIcon;

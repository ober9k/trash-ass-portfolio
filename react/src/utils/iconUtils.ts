import adaUrl from "@/assets/icons/ada.png";
import dogeUrl from "@/assets/icons/doge.png";
import hypeUrl from "@/assets/icons/hype.png";
import neoUrl from "@/assets/icons/neo.png";
import pepeUrl from "@/assets/icons/pepe.png";
import vetUrl from "@/assets/icons/vet.png";
import xlmUrl from "@/assets/icons/xlm.png";
import zbcnUrl from "@/assets/icons/zbcn.png";
import zecUrl from "@/assets/icons/zec.png";
import { Token } from "@shared/types/token.ts";

export type IconSize = "xs" | "sm" | "md" | "lg";
export const DefaultIconSize: IconSize = "md"; /* value used for now */

export function getIconUrl(token: Token): string {
  switch (token) {
    case Token.ADA:  return adaUrl as string;
    case Token.DOGE: return dogeUrl as string;
    case Token.HYPE: return hypeUrl as string;
    case Token.NEO:  return neoUrl as string;
    case Token.PEPE: return pepeUrl as string;
    case Token.VET:  return vetUrl as string;
    case Token.XLM:  return xlmUrl as string;
    case Token.ZBCN: return zbcnUrl as string;
    case Token.ZEC:  return zecUrl as string;
    default: throw Error("Unexpected value for `token`.");
  }
}

export function getIconClass(size: IconSize): string {
  switch (size) {
    case "xs": return "size-4";
    case "sm": return "size-6";
    case "md": return "size-8";
    case "lg": return "size-10";
    default: throw Error("Unexpected value for `size`.");
  }
}

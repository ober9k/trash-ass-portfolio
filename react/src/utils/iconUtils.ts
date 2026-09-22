import adaUrl from "@/assets/icons/ada.png";
import dogeUrl from "@/assets/icons/doge.png";
import hypeUrl from "@/assets/icons/hype.png";
import neoUrl from "@/assets/icons/neo.png";
import pepeUrl from "@/assets/icons/pepe.png";
import vetUrl from "@/assets/icons/vet.png";
import xlmUrl from "@/assets/icons/xlm.png";
import zbcnUrl from "@/assets/icons/zbcn.png";
import zecUrl from "@/assets/icons/zec.png";
import { Ticker } from "@shared/types/ticker.ts";

export type IconSize = "xs" | "sm" | "md" | "lg";
export const defaultSize: IconSize = "md"; /* value used for now */

export function getIconUrl(ticker: Ticker): string {
  switch (ticker) {
    case Ticker.ADA:  return adaUrl as string;
    case Ticker.DOGE: return dogeUrl as string;
    case Ticker.HYPE: return hypeUrl as string;
    case Ticker.NEO:  return neoUrl as string;
    case Ticker.PEPE: return pepeUrl as string;
    case Ticker.VET:  return vetUrl as string;
    case Ticker.XLM:  return xlmUrl as string;
    case Ticker.ZBCN: return zbcnUrl as string;
    case Ticker.ZEC:  return zecUrl as string;
    default: throw Error("Unexpected value for `ticker`.");
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

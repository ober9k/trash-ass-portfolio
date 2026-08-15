import adaUrl from '@/assets/icons/ada.png';
import dogeUrl from '@/assets/icons/doge.png';
import hypeUrl from '@/assets/icons/hype.png';
import neoUrl from '@/assets/icons/neo.png';
import pepeUrl from '@/assets/icons/pepe.png';
import vetUrl from '@/assets/icons/vet.png';
import xlmUrl from '@/assets/icons/xlm.png';
import zbcnUrl from '@/assets/icons/zbcn.png';
import zecUrl from '@/assets/icons/zec.png';

function getIconUrl(symbol: string) {
  switch (symbol) {
    case "ada":  return adaUrl;
    case "doge": return dogeUrl;
    case "hype": return hypeUrl;
    case "neo":  return neoUrl;
    case "pepe": return pepeUrl;
    case "vet":  return vetUrl;
    case "xlm":  return xlmUrl;
    case "zbcn": return zbcnUrl;
    case "zec":  return zecUrl;
    default: throw Error("Unexpected symbol for iconUrl.");
  }
}

type TokenIconProps = {
  symbol: string,
};

function TokenIcon({ symbol }: TokenIconProps) {
  const iconUrl = getIconUrl(symbol);

  return (
    <>
      <img className="m-0.5 h-8 w-8 rounded-full" src={iconUrl} alt={symbol} />
    </>
  );
}

export default TokenIcon;

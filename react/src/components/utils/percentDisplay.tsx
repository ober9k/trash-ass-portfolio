import { Defaults } from "@/config/defaults.ts";
import { calculatePercentGain } from "@/utils/mathUtils.ts";

type Props = {
  currentValue: number,
  initialValue: number,
  precision?:   number,
};

function PercentDisplay(props: Props) {
  const { currentValue, initialValue, precision = Defaults.PercentPrecision } = props;

  const gainValue = calculatePercentGain(currentValue, initialValue);
  const gainClass = (gainValue > 0)
    ? "bg-green-200 text-green-600"
    : "bg-red-200 text-red-600";

  return (
    <>
      <span className={`mx-1 px-1 py-1 rounded ${gainClass} text-xs font-normal`}>
        {gainValue > 0 && "+"}
        {gainValue.toFixed(precision)}%
      </span>
    </>
  );
}

export default PercentDisplay;

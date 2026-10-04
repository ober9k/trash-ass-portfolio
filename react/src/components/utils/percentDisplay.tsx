import { calculatePercentGain } from "@/utils/mathUtils.ts";
import { formatPercent } from "@/utils/numberUtils.ts";
import { Box } from "@mui/material";

type Props = {
  currentValue: number,
  initialValue: number,
  precision?:   number,
};

function PercentDisplay(props: Props) {
  const { currentValue, initialValue } = props;

  const gainValue = calculatePercentGain(currentValue, initialValue);
  const gainClass = (gainValue > 0)
    ? "bg-green-200 text-green-500"
    : "bg-red-200 text-red-500";

  return (
    <>
      <Box component="span" className={`ml-1.5 px-1.5 py-0.5 rounded ${gainClass}`}>
        {formatPercent(gainValue)}
      </Box>
    </>
  );
}

export default PercentDisplay;

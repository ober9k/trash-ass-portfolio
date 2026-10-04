import PercentDisplay from "@/components/utils/percentDisplay.tsx";
import { formatCurrency } from "@/utils/numberUtils";
import { Box, Typography } from "@mui/material";

type Props = {
  currentValue: number,
  initialValue: number,
};

function GainDisplay(props: Props) {
  const { currentValue, initialValue } = props;

  const gainValue = currentValue-initialValue;
  const gainClass = (gainValue > 0)
    ? "text-green-500"
    : "text-red-500";

  return (<>
    <Box component="span" className="font-bold">
      <Box component="span" className={gainClass}>
        {formatCurrency(currentValue-initialValue)}
      </Box>
      <PercentDisplay currentValue={currentValue} initialValue={initialValue} />
    </Box>
  </>);
}

export default GainDisplay;

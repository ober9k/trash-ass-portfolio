import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Period } from "@shared/types/period.ts";
import { useState, type MouseEvent } from "react";

const periods: string[] = [
  Period.OneHour, 
  Period.OneDay, 
  Period.OneWeek, 
  Period.OneMonth, 
  Period.OneYear, 
  Period.All,
].map((p) => p.toString());

type Props = {
  onToggle: (period: string) => void,
}

function PeriodToggle(props: Props) {
  const { onToggle } = props;
  const [ period, setPeriod ] = useState<string>(Period.All.toString());

  const onChange = (event: MouseEvent<HTMLElement>, period: string) => {
    setPeriod(period);
    onToggle(period);
  };

  return (
    <>
      <Box component="nav" className="flex justify-center p-2">
        <ToggleButtonGroup onChange={onChange} value={period} size="small" exclusive>
          {periods.map((p, key) => (
            <ToggleButton key={key} value={p.toString()} disabled={p === period} className="min-w-8 px-1 py-0">
              {p}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </>
  );
}

export default PeriodToggle;

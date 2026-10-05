import { Box, Card, ToggleButton, ToggleButtonGroup } from "@mui/material";
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
  period?: string,
  onToggle: (period: string) => void,
}

function PeriodToggle(props: Props) {
  const { period: initialPeriod, onToggle } = props;
  const [ period, setPeriod ] = useState<string>(initialPeriod ?? Period.All.toString());

  const onChange = (event: MouseEvent<HTMLElement>, period: string) => {
    setPeriod(period);
    onToggle(period);
  };

  return (<>
    <Card>
      <Box component="nav" className="flex justify-center p-4">
        <ToggleButtonGroup onChange={onChange} value={period} size="small" exclusive>
          {periods.map((p, key) => (
            <ToggleButton key={key} value={p.toString()} disabled={p === period} className="min-w-8 px-2 py-1">
              {p}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Card>
  </>);
}

export default PeriodToggle;

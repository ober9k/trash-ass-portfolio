import { Typography } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode,
};

function NavigationTitle(props: Props) {
  const { children } = props;

  return (<>
    <Typography variant="h4" component="h4" className="flex text-lg">
      {children}
    </Typography>
  </>);
}

export default NavigationTitle;

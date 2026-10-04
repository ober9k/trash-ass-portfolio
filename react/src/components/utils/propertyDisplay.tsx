import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  title:    string,
  children: ReactNode,
};

function PropertyDisplay(props: Props) {
  const { title, children } = props;

  return (
    <>
    <Box component="section" className="grow">
      <Box className="pb-2">
        <Typography variant="h4" component="h4" color="textSecondary" className="text-xs uppercase">
          {title}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" component="h6" className="text-lg">
          {children}
        </Typography>
      </Box>
    </Box>
    </>
  );
}

export default PropertyDisplay;

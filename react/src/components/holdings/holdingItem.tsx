import AssetIcon from "@/components/assets/assetIcon.tsx";
import AssetDisplay from "@/components/utils/assetDisplay.tsx";
import CurrencyDisplay from "@/components/utils/currencyDisplay.tsx";
import { Urls } from "@/config/urls.ts";
import { Box, Divider, Typography } from "@mui/material";
import type { Holding } from "@shared/types/portfolio.ts";
import { Link } from "@tanstack/react-router";
import GainDisplay from "../utils/gainDisplay";

type Props = {
  holding: Holding,
};

function HoldingItem(props: Props) {
  const { holding } = props;
  const { asset, summary } = holding;

  return (
    <>
      <Box className="flex gap-3 p-1 mb-1 pb-3">
        <Box component="section" className="s-8">
          <AssetIcon asset={asset} />
        </Box>
        <Box component="section" className="grow">
          <Typography variant="h4" component="h4" className="pb-2 text-xl">
            <Link to={Urls.Holding} params={{ holdingId: asset.id }}>
              {asset.name}
            </Link>
          </Typography>
          <Typography variant="h6" component="h6" className="text-sm">
            <AssetDisplay asset={asset} quantity={summary.quantity} />
          </Typography>
        </Box>
        <Box component="section" className="text-right">
          <Typography variant="h4" component="h4" className="pb-2 text-xl">
            <CurrencyDisplay currentValue={summary.currentValue} />
          </Typography>
          <Typography variant="h6" component="h6" className="text-sm">
            <GainDisplay currentValue={summary.currentValue} initialValue={summary.initialValue} />
          </Typography>
        </Box>
      </Box>
      <Divider className="mb-3" />
    </>
  );
}

export default HoldingItem;

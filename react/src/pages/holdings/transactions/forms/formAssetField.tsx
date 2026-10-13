import AssetIcon from "@/components/assets/assetIcon.tsx";
import { Box, FormControl, FormLabel, TextField } from "@mui/material";
import type { Asset } from "@shared/types/portfolio.ts";

type Props = {
  asset: Asset,
};

function FormAssetField(props: Props) {
  const { asset } = props;

  const inputAdornment = {
    startAdornment: (<Box className="pr-2">
      <AssetIcon asset={asset} size="sm" />
    </Box>)
  };

  return (<>
    <FormControl fullWidth={true}>
      <FormLabel id={"asset-label"} htmlFor={"asset"} required={true} className="py-3">{"Asset"}</FormLabel>
      <TextField slotProps={{ input: inputAdornment }} id={"asset"} name={"asset"} type={"text"} required={true} disabled={true} defaultValue={asset.name} />
    </FormControl>
  </>);
}

export default FormAssetField;

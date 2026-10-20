import AssetIcon from "@/components/assets/assetIcon.tsx";
import FormTextField from "@/components/forms/formTextField";
import type { Config, State } from "@/types/forms/fields";
import { FormFieldType } from "@/types/forms/fields/type";
import { Box } from "@mui/material";
import type { Asset } from "@shared/types/portfolio.ts";

type Props = {
  asset: Asset,
};

function AssetField(props: Props) {
  const { asset } = props;

  const config: Config = {
    label:    "Asset",
    name:     "asset",
    type:     FormFieldType.Text,
    required: true,
    disabled: true,
    slotProps: {
      input: {
        startAdornment: (<Box className="pr-2"><AssetIcon asset={asset} size="sm" /></Box>),
      } as any /* hax for complaints */,
    }
  };

  const state: State = {
    value:  asset.name,
    errors: [],
  };

  return (<>
    <FormTextField config={config} state={state} />
  </>);
}

export default AssetField;

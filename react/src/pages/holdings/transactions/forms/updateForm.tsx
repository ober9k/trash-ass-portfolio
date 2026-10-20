import AssetField from "@/components/forms/customFields/assetField";
import FormFields from "@/components/forms/formFields";
import AltCardHeader from "@/components/miscellaneous/altCardHeader.tsx";
import { fieldConfigs } from "@/forms/transactions/fieldConfigs";
import type { Field } from "@/types/forms/fields";
import type { FormState } from "@/types/formState.ts";
import { Box, Card, CardActions, CardContent, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import type { TransactionData } from "@shared/schemas/transactionSchema.ts";
import type { Asset } from "@shared/types/portfolio.ts";

type Props = {
  asset:      Asset,
  formState:  FormState<TransactionData>,
  formAction: (payload: FormData) => void,
  isPending:  boolean,
  onCancel:   () => void,
};

function UpdateForm(props: Props) {
  const { asset, formState, formAction, isPending, onCancel } = props;
  const { formErrors, fieldValues, fieldErrors } = formState;

  const fields: Field[] = fieldConfigs.map((config) => ({
    config: config,
    state: {
      value:  fieldValues[config.name as keyof typeof fieldValues].toString() ?? "",
      errors: fieldErrors[config.name as keyof typeof fieldErrors] || [],
    },
  }));

  return (<>
    <Box component="form" action={formAction} noValidate>
      <Card>
        <AltCardHeader title={"Transaction Details"} />
        <Divider className={"py-2"} />
        <CardContent className="flex flex-col gap-3">
          <AssetField asset={asset} />
          <FormFields fields={fields} />
        </CardContent>
        <Divider className={"py-2"} />
        <CardActions className="flex flex-row gap-2 justify-center p-4">
          <Button type="button" disabled={isPending} onClick={onCancel} size="small" variant="outlined">Cancel</Button>
          <Button type="submit" disabled={isPending} size="small" variant="contained">Update</Button>
        </CardActions>
      </Card>
    </Box>
  </>);
}

export default UpdateForm;

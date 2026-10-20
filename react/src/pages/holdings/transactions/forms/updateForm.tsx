import FormFields from "@/components/forms/formFields";
import AltCardHeader from "@/components/miscellaneous/altCardHeader.tsx";
import { fields, type FieldConfig } from "@/forms/transactions/fields.ts";
import FormAssetField from "@/pages/holdings/transactions/forms/formAssetField.tsx";
import type { FieldState, FormState } from "@/types/formState.ts";
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

type Field = {
  config: FieldConfig,
  state:  FieldState,
};

function UpdateForm(props: Props) {
  const { asset, formState, formAction, isPending, onCancel } = props;
  const { formErrors, fieldValues, fieldErrors } = formState;

  const formFields: Field[] = fields.map((config) => ({
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
          <FormAssetField asset={asset} />
          <FormFields formFields={formFields} />
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

import FormRadioField from "@/components/forms/formRadioField.tsx";
import FormTextField from "@/components/forms/formTextField.tsx";
import AltCardHeader from "@/components/miscellaneous/altCardHeader.tsx";
import { fields } from "@/forms/transactions/fields.ts";
import FormAssetField from "@/pages/holdings/transactions/forms/formAssetField.tsx";
import { FormFieldType } from "@/types/forms/fields/type.ts";
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

  const formFieldStates = fields.map((formField) => ({
    ...formField,
    value:  fieldValues[formField.name as keyof typeof fieldValues] ?? "",
    errors: fieldErrors[formField.name as keyof typeof fieldErrors] || [],
  }));

  return (<>
    <Box component="form" action={formAction} noValidate>
      <Card>
        <AltCardHeader title={"Transaction Details"} />
        <Divider className={"py-2"} />
        <CardContent className="flex flex-col gap-3">
          <FormAssetField asset={asset} />
          {formFieldStates.map((fieldState) => (
            (fieldState.type === FormFieldType.Radio) ? (
              <FormRadioField key={fieldState.name} fieldState={fieldState} />
            ) : (
              <FormTextField key={fieldState.name} fieldState={fieldState} />
            )
          ))}
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

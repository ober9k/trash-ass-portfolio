import FormTextField, { type FormTextFieldState } from "@/components/forms/formTextField.tsx";
import AltCardHeader from "@/components/miscellaneous/altCardHeader.tsx";
import type { FormState } from "@/types/formState.ts";
import { Box, Card, CardActions, CardContent, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import type { TransactionData } from "@shared/schemas/transactionSchema.ts";

type Props = {
  formState:  FormState<TransactionData>,
  formAction: (payload: FormData) => void,
  isPending:  boolean,
  onCancel:   () => void,
};

function UpdateForm(props: Props) {
  const { formState, formAction, isPending, onCancel } = props;
  const { formErrors, fieldValues, fieldErrors } = formState;

  const priceFieldState: FormTextFieldState = {
    name:     "price",
    type:     "text",
    label:    "Price",
    required: true,
    value:    fieldValues.price.toString(),
    errors:   fieldErrors.price || [],
  };

  const quantityFieldState: FormTextFieldState = {
    name:     "quantity",
    type:     "text",
    label:    "Quantity",
    required: true,
    value:    fieldValues.quantity.toString(),
    errors:   fieldErrors.quantity || [],
  };

  const feeFieldState: FormTextFieldState = {
    name:     "fee",
    type:     "text",
    label:    "Fee",
    required: true,
    value:    fieldValues.fee.toString(),
    errors:   fieldErrors.fee || [],
  };

  const valueFieldState: FormTextFieldState = {
    name:     "value",
    type:     "text",
    label:    "Value",
    required: true,
    value:    fieldValues.value.toString(),
    errors:   fieldErrors.value || [],
  };

  return (<>
    <Box component="form" action={formAction} noValidate>
      <Card>
        <AltCardHeader title={"Transaction Details"} />
        <Divider className={"p-2 mb-2"} />
        <CardContent className="flex flex-col gap-8">
          <FormTextField fieldState={priceFieldState} />
          <FormTextField fieldState={quantityFieldState} />
          <FormTextField fieldState={feeFieldState} />
          <FormTextField fieldState={valueFieldState} />
        </CardContent>
        <Divider />
        <CardActions className="flex flex-row gap-2 justify-center p-4">
          <Button type="button" disabled={isPending} onClick={onCancel} size="small" variant="outlined">Cancel</Button>
          <Button type="submit" disabled={isPending} size="small" variant="contained">Update</Button>
        </CardActions>
      </Card>
    </Box>
  </>);
}

export default UpdateForm;

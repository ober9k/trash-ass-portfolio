import type { TransactionLoaderProps } from "@/api/loaders";
import { buildUpdateTransactionFn } from "@/api/mutationFunctions";
import FormTextField, { type FormTextFieldState } from "@/components/forms/formTextField.tsx";
import NavigationBar from "@/components/layout/navigationBar.tsx";
import AltCardHeader from "@/components/miscellaneous/altCardHeader.tsx";
import { Urls } from "@/config/urls.ts";
import { buildFormAction } from "@/forms/transactions/actions";
import { buildInitialState } from "@/forms/transactions/form.ts";
import { Box, Card, CardActions, CardContent, Divider, IconButton, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useActionState } from "react";

function TransactionPage() {
  const { asset, transaction }: TransactionLoaderProps = getRouteApi(Urls.Transaction).useLoaderData();
  const router = useRouter();

  const leftSlot = (
    <IconButton size="large" color="inherit" edge="start" aria-label="go back">
      <Link to={Urls.Holding} params={{ holdingId: asset.ticker.toLowerCase() }}>
        <ArrowLeft />
      </Link>
    </IconButton>
  );

  const mutation = useMutation({
    mutationFn: buildUpdateTransactionFn(transaction.id),
    onSuccess: (data) => {
      console.log("success", data);
    },
    onError: (error) => {
      console.error("error", error);
    }
  });

  const [ formState, formAction, isPending ] = useActionState(buildFormAction(mutation), buildInitialState(transaction));

  const onCancel = () => {
    router.navigate({ to: Urls.Holding, params: { holdingId: asset.ticker.toLowerCase() } });
  };

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

  return (
    <>
      <article style={{ backgroundColor: "#121212" }} className="h-dvh">
        <NavigationBar leftSlot={leftSlot}>
          <Typography variant="h4" component="h4" className="text-lg">
            Update Transaction
          </Typography>
        </NavigationBar>
        <article className="flex flex-col gap-4 p-2 m-2">
          <Box component="form" action={formAction} noValidate>
            <Card>
              <AltCardHeader title={"Transaction Details"} />
              <CardContent className="flex flex-col gap-4">
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
        </article>
      </article>
    </>
  );
}

export default TransactionPage;

import type { TransactionLoaderProps } from "@/api/loaders";
import { buildUpdateTransactionFn } from "@/api/mutationFunctions";
import NavigationBar from "@/components/layout/navigationBar.tsx";
import { IconButton, Typography } from "@mui/material";
import type { TransactionData } from "@shared/schemas/transactionSchema";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useActionState } from "react";
import { buildFormAction, type FormState } from "@/forms/transactions/actions";

/**
 * Prepare based off loaded season if provided.
 */
export function buildInitialState(transaction?: TransactionData): FormState {
  const fieldValues = (transaction)
    ? {
      price:    transaction.price,
      quantity: transaction.quantity,
      fee:      transaction.fee,
      value:    transaction.value,
    } : {
      price:    0,
      quantity: 0,
      fee:      0,
      value:    0,
    }

  return {
    fieldValues, fieldErrors: {}, formErrors: []
  };
}

function TransactionPage() {
  const { transaction }: TransactionLoaderProps = getRouteApi("/transactions/x/$transactionId").useLoaderData();
  const navigate = useNavigate();

  const leftSlot = (
    <IconButton size="large" color="inherit" edge="start" aria-label="go back">
      <Link to={"/transactions/$tokenId"} params={{ tokenId: "ADA" /* TODO: temp value */ }}>
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
    navigate({ to: "/" }); /* TODO: fix type handling for optional period value */
  };

  return (
    <>
      <article>
        <NavigationBar leftSlot={leftSlot}>
          <Typography variant="h4" component="h4" className="text-lg">
            Update Transaction
          </Typography>
        </NavigationBar>
        <form action={formAction} noValidate>
          <div className="p-4 m-4">
            <h1>Transaction Details</h1>
            <hr className="my-4" />
            <p>
              <strong>ID:</strong> {transaction.id}<br />
              <strong>Price:</strong> {transaction.price}<br />
              <strong>Quantity:</strong> {transaction.quantity}<br />
              <strong>Fee:</strong> {transaction.fee}<br />
              <strong>Value:</strong> {transaction.value}<br />
              <strong>Purchased At:</strong> {transaction.purchasedAt.toString()}<br />
            </p>
          </div>
          <div className="p-4 m-4">
            <h1>Update Transaction</h1>
            <hr className="my-4" />
            <p>
              <label htmlFor="price" className="font-medium block">Price:</label>
              <input type="text" id="price" name="price" defaultValue={formState.fieldValues.price} required className="my-1 p-1 border w-full" />
              {formState.fieldErrors.price && <span className="text-red-500">{formState.fieldErrors.price}</span>}
            </p>
            <p>
              <label htmlFor="quantity" className="font-medium block">Quantity:</label>
              <input type="text" id="quantity" name="quantity" defaultValue={formState.fieldValues.quantity} required className="my-1 p-1 border w-full" />
              {formState.fieldErrors.quantity && <span className="text-red-500">{formState.fieldErrors.quantity}</span>}
            </p>
            <p>
              <label htmlFor="fee" className="font-medium block">Fee:</label>
              <input type="text" id="fee" name="fee" defaultValue={formState.fieldValues.fee} required className="my-1 p-1 border w-full" />
              {formState.fieldErrors.fee && <span className="text-red-500">{formState.fieldErrors.fee}</span>}
            </p>
            <p>
              <label htmlFor="value" className="font-medium block">Value:</label>
              <input type="text" id="value" name="value" defaultValue={formState.fieldValues.value} required className="my-1 p-1 border w-full" />
              {formState.fieldErrors.value && <span className="text-red-500">{formState.fieldErrors.value}</span>}
            </p>
            <hr className="my-4" />
            <p className="flex flex-row gap-2">
              <button type="button" disabled={isPending} className="my-1 p-1 border" onClick={onCancel}>
                Cancel
              </button>
              <button type="submit" disabled={isPending} className="my-1 p-1 border">
                Update
              </button>
            </p>
          </div>
        </form>
      </article>
    </>
  );
}

export default TransactionPage;

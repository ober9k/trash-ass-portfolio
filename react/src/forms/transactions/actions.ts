import { getValue, onFieldError, onFormError, onSuccess, onUnexpectedError, type AsFieldError } from "@/utils/formUtils";
import { TransactionSchema, type TransactionData } from "@shared/schemas/transactionSchema";
import axios from "axios";
import { z } from "zod";

export type FormState = {
  formErrors:  string[],
  fieldValues: TransactionData,
  fieldErrors: Partial<AsFieldError<TransactionData>>,
};

export const buildFormAction = (mutation) => {
  return async (formState: FormState, formData: FormData) => {

    const fieldValues = {
      price:    parseFloat(getValue(formData, "price")),
      quantity: parseFloat(getValue(formData, "quantity")),
      fee:      parseFloat(getValue(formData, "fee")),
      value:    parseFloat(getValue(formData, "value")),
    };

    try {
      const data: TransactionData = {
        price:    fieldValues.price,
        quantity: fieldValues.quantity,
        fee:      fieldValues.fee,
        value:    fieldValues.value,
      };

      TransactionSchema.parse(data);
      await mutation.mutateAsync(data);
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        const { fieldErrors } = z.flattenError(error);
        return onFieldError(fieldValues, fieldErrors);
      }
      else if (axios.isAxiosError(error)) {
        const { formErrors } = error.response!.data; /* TODO: revisit strict/null checks for error data */
        return onFormError(fieldValues, formErrors);
      }
      
      return onUnexpectedError(fieldValues);
    }

    return onSuccess(fieldValues);
  };
}

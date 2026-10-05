import type { FormState } from "@/types/formState.ts";
import { getValue, onFieldError, onFormError, onSuccess, onUnexpectedError } from "@/utils/formUtils";
import { type TransactionData, TransactionSchema } from "@shared/schemas/transactionSchema";
import axios from "axios";
import { z } from "zod";

export const buildFormAction = (mutation) => {
  return async (formState: FormState<TransactionData>, formData: FormData) => {

    const fieldValues = {
      price:    parseFloat(getValue(formData, "price")),
      quantity: parseFloat(getValue(formData, "quantity")),
      fee:      parseFloat(getValue(formData, "fee")),
      value:    parseFloat(getValue(formData, "value")),
    };

    try {
      const data: TransactionData = { ... fieldValues };
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

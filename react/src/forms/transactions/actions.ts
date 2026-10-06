import type { FormState } from "@/types/formState.ts";
import { getFloatValue, getValue, onFieldError, onFormError, onSuccess, onUnexpectedError } from "@/utils/formUtils";
import { type TransactionData, TransactionSchema } from "@shared/schemas/transactionSchema";
import axios from "axios";
import { z } from "zod";

export const buildFormAction = (mutation) => {
  return async (formState: FormState<TransactionData>, formData: FormData) => {

    const fieldValues = {
      type:     getValue(formData, "type"),
      price:    getFloatValue(formData, "price"),
      quantity: getFloatValue(formData, "quantity"),
      fee:      getFloatValue(formData, "fee"),
      value:    getFloatValue(formData, "value"),
    };

    console.log("fieldValues", getFloatValue(formData, "price"));

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

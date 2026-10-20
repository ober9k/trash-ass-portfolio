import type { FormState } from "@/types/formState.ts";
import { getFloatValue, getIsoDateValue, getValue, onFieldError, onFormError, onSuccess, onUnexpectedError, toDateTimeLocalString } from "@/utils/formUtils";
import { type TransactionData, TransactionSchema } from "@shared/schemas/transactionSchema";
import axios from "axios";
import { z } from "zod";

export const buildFormAction = (mutation) => {
  return async (formState: FormState<TransactionData>, formData: FormData) => {

    const fieldValues = {
      type:        getValue(formData, "type"),
      price:       getFloatValue(formData, "price"),
      quantity:    getFloatValue(formData, "quantity"),
      fee:         getFloatValue(formData, "fee"),
      value:       getFloatValue(formData, "value"),
      purchasedAt: getIsoDateValue(formData, "purchasedAt"),
    };

    try {
      const data = TransactionSchema.parse(fieldValues);
      await mutation.mutateAsync(data);
    }
    catch (error) {
      // TODO: handle date properly
      fieldValues.purchasedAt = toDateTimeLocalString(new Date(fieldValues.purchasedAt!));

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

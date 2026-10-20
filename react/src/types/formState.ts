import type { FieldConfig } from "@/forms/transactions/fields";

/**
 * Cast a field value type to be a field error type.
 */
export type AsFieldError<T> ={
  [K in keyof T]?: string[];
};

export type FormState<T> = {
  formErrors:  string[],
  fieldValues: T,
  fieldErrors: Partial<AsFieldError<T>>,
};

export type FormField = {
  config: FieldConfig,
  state:  FieldState,
};

export type FieldState = {
  value:  string,
  errors: string[],
};

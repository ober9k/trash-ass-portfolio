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

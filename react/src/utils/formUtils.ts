/**
 * Handle for success.
 * @param fieldValues
 */
export function onSuccess(fieldValues: any) {
  const fieldErrors = {};
  const formErrors: any[] = []; /* TODO: fix type */
  return { fieldValues, fieldErrors, formErrors };
}

/**
 * Handle for field errors.
 * @param fieldValues
 * @param fieldErrors
 */
export function onFieldError(fieldValues: any, fieldErrors: any) {
  const formErrors: any[] = []; /* TODO: fix type */
  return { fieldValues, fieldErrors, formErrors };
}

/**
 * Handle for form errors.
 * @param fieldValues
 * @param formErrors
 */
export function onFormError(fieldValues: any, formErrors: any) {
  const fieldErrors = {};
  return { fieldValues, fieldErrors, formErrors };
}

/**
 * Handle state result for unexpected result.
 * This can potentially use a generic for the field values type.
 * @param fieldValues
 */
export function onUnexpectedError(fieldValues: any) {
  const fieldErrors = {};
  const formErrors = ["Unexpected error has occurred."];
  return { fieldValues, fieldErrors, formErrors };
}

/**
 * Helper for handling string values from `formData`.
 */
export function getValue(formData: FormData, key: string): string | undefined {
  return formData.get(key)?.toString(); /* TODO: revisit strict/null checks for formData */
}

/**
 * Helper for handling date time values.
 * TODO: this needs to be improved as it's the bare minimum
 */
export function getIsoDateValue(formData: FormData, key: string): string | undefined {
  return new Date(getValue(formData, key)?? "").toISOString();
}

/**
 * Helper for handling int values from `formData`.
 * TODO: reduce duplication
 */
export function getIntValue(formData: FormData, key: string): number | undefined {
  if (formData.has(key)) {
    const value = formData.get(key);

    if (value === "" || typeof value !== "string") {
      return undefined;
    }

    const parsed = parseInt(value);

    return (!Number.isNaN(parsed))
      ? parsed
      : undefined;
  }

  return undefined;
}

/**
 * Helper for handling float values from `formData`.
 * TODO: reduce duplication
 */
export function getFloatValue(formData: FormData, key: string): number | undefined {
  if (formData.has(key)) {
    const value = formData.get(key);

    if (value === "" || typeof value !== "string") {
      return undefined;
    }

    const parsed = parseFloat(value);

    return (!Number.isNaN(parsed))
      ? parsed
      : undefined;
  }

  return undefined;
}

/**
 * Helpers for using formData from useActionState.
 * @param formData 
 * @param key 
 * @returns 
 */
export function getCheckboxValue(formData: FormData, key: string): boolean {
  return formData.has(key)
    ? formData.get(key) === "on"
    : false;
}

/**
 * Temp copypasta from Gemini.
 * TODO: revisit using new JS date handling instead
 */
export function toDateTimeLocalString(date: Date): string {

  const pv = (v: number) => String(v).padStart(2, "0");

  const year    = date.getFullYear();
  const month   = pv(date.getMonth() + 1);
  const day     = pv(date.getDate());
  const hours   = pv(date.getHours());
  const minutes = pv(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

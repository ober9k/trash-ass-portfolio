export const Type = {
  Text:      "text",
  Date:      "date",     // not yet handled
  DateTime:  "datetime-local",
  Number:    "number",
  Email:     "email",    // not yet handled
  Password:  "password", // not yet handled
  // special types
  Checkbox:  "checkbox",
  Radio:     "radio",
  Select:    "select",
} as const;

export type Type = typeof Type[keyof typeof Type];

export { Type as FieldType, Type as FormFieldType }; /* aliased alternate */

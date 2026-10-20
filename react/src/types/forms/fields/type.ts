export const Type = {
  Text:      "text",
  Date:      "date",     // not yet handled
  DateTime:  "datetime-local",
  Number:    "number",
  Email:     "email",    // not yet handled
  Password:  "password", // not yet handled
  // special types
  Radio:     "radio",
} as const;

export type Type = typeof Type[keyof typeof Type];

export { Type as FieldType }; /* aliased alternate */
export { Type as FormFieldType }; /* aliased alternate */

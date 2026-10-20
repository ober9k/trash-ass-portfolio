import type { FormFieldType } from "@/types/forms/fields/type";
import type { TextFieldSlots } from "@mui/material";

type BaseConfig = {
  name:       string,
  label:      string,
  required?:  boolean,
  disabled?:  boolean,
  slotProps?: Pick<TextFieldSlots, "input">,
};

export type CheckboxConfig = {
  type: Extract<FormFieldType, "checkbox">,
} & BaseConfig & WithFieldOptions;

export type RadioConfig = {
  type: Extract<FormFieldType, "radio">,
} & BaseConfig & WithFieldOptions;

export type SelectConfig = {
  type: Extract<FormFieldType, "select">,
} & BaseConfig & WithFieldOptions;

export type TextConfig = {
  type: Exclude<FormFieldType, "checkbox" | "radio" | "select">,
} & BaseConfig;

/**
 * Union type used for form field arrays.
 */
export type Config = CheckboxConfig | RadioConfig | SelectConfig | TextConfig;

/**
 * Shared type for fields which can handle options.
 */
type WithFieldOptions = {
  options: Record<string, string>[],
};

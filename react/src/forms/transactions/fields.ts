import { FormFieldType } from "@/types/forms/fields/type";
import type { TextFieldSlots } from "@mui/material";

type BaseFieldConfig = {
  name:       string,
  label:      string,
  required?:  boolean,
  disabled?:  boolean,
  slotProps?: Pick<TextFieldSlots, "input">,
};

type WithFieldOptions = {
  options: Record<string, string>[],
};

export type RadioFieldConfig = {
  type: Extract<FormFieldType, "radio">,
} & BaseFieldConfig & WithFieldOptions;

export type TextFieldConfig = {
  type: Exclude<FormFieldType, "radio">,
} & BaseFieldConfig;

export type FieldConfig = RadioFieldConfig | TextFieldConfig;

/**
 * TODO: update to instead include radio/text field as a single generic type
 */
export const fields: Array<FieldConfig> = [{
  label:    "Type",
  name:     "type",
  type:     FormFieldType.Radio,
  required: true,
  options: [
    { label: "Buy",      value: "buy" },
    { label: "Sell",     value: "sell" },
    { label: "Yield",    value: "yield" },
    { label: "Transfer", value: "transfer" },
  ],
},{
  label:    "Price",
  name:     "price",
  type:     FormFieldType.Text,
  required: true,
},{
  label:    "Quantity",
  name:     "quantity",
  type:     FormFieldType.Text,
  required: true,
},{
  label:    "Fee",
  name:     "fee",
  type:     FormFieldType.Text,
  required: true,
},{
  label:    "Value",
  name:     "value",
  type:     FormFieldType.Text,
  required: true,
},{
  label:    "PurchasedAt",
  name:     "purchasedAt",
  type:     FormFieldType.DateTime,
  required: true,
}];

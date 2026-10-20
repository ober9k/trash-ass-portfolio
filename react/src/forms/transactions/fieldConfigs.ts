import type { Config } from "@/types/forms/fields/config";
import { FormFieldType } from "@/types/forms/fields/type";

/**
 * TODO: update to instead include radio/text field as a single generic type
 */
export const fieldConfigs: Array<Config> = [{
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

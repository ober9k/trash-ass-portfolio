import FormErrors from "@/components/forms/formErrors.tsx";
import type { TextFieldConfig } from "@/forms/transactions/fields";
import type { FieldState } from "@/types/formState";
import { FormControl, FormLabel, TextField } from "@mui/material";

type Props = {
  config: TextFieldConfig,
  state:  FieldState,
};

function FormTextField(props: Props) {
  const { name, type, label, required } = props.config;
  const { value, errors } = props.state;

  return (<>
    <FormControl fullWidth={true}>
      <FormLabel id={name + "-label"} htmlFor={name} required={required} className="py-3">{label}</FormLabel>
      <TextField id={name} name={name} type={type} required={required} defaultValue={value} />
      <FormErrors errors={errors} />
    </FormControl>
  </>)
}

export default FormTextField;

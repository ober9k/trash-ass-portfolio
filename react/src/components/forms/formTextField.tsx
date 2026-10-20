import FormErrors from "@/components/forms/formErrors.tsx";
import type { State, TextConfig } from "@/types/forms/fields";
import { FormControl, FormLabel, TextField } from "@mui/material";

type Props = {
  config: TextConfig,
  state:  State,
};

function FormTextField(props: Props) {
  const { name, type, label, required = false, disabled = false, slotProps } = props.config;
  const { value, errors } = props.state;

  return (<>
    <FormControl fullWidth={true}>
      <FormLabel id={name + "-label"} htmlFor={name} required={required} className="py-3">{label}</FormLabel>
      <TextField id={name} name={name} type={type} required={required} disabled={disabled} defaultValue={value} slotProps={slotProps} />
      <FormErrors errors={errors} />
    </FormControl>
  </>)
}

export default FormTextField;

import FormErrors from "@/components/forms/formErrors.tsx";
import { FormControl, FormControlLabel, FormLabel, TextField } from "@mui/material";

export type FormTextFieldState = {
  name:      string,
  type:      "text" | "date" | "email" | "password",
  label:     string,
  required?: boolean,
  value:     string,
  errors:    string[],
};

type Props = {
  fieldState: FormTextFieldState,
};

function FormTextField(props: Props) {
  const { name, type, label, required, value, errors } = props.fieldState;

  return (<>
    <FormControl fullWidth={true}>
      <FormLabel id={name + "-label"} htmlFor={name} required={required} className="p-3">{label}</FormLabel>
      <TextField id={name} name={name} type={type} required={required} defaultValue={value} />
      <FormErrors errors={errors} />
    </FormControl>
  </>)
}

export default FormTextField;

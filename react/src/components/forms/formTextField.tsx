import FormErrors from "@/components/forms/formErrors.tsx";
import { FormControl, TextField } from "@mui/material";

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
      <TextField id={name} name={name} type={type} label={label} required={required} defaultValue={value} size="small" variant="outlined" />
      <FormErrors errors={errors} />
    </FormControl>
  </>)
}

export default FormTextField;

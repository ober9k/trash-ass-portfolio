import FormErrors from "@/components/forms/formErrors.tsx";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

export type FormRadioFieldState = {
  name:      string,
  label:     string,
  required?: boolean,
  value?:    string,
  options:   { [key: string]: any }[],
  errors:    string[],
};

type Props = {
  fieldState: FormRadioFieldState,
};

function FormRadioField(props: Props) {
  const { name, label, required, value, options, errors } = props.fieldState;

  return (<>
    <FormControl fullWidth={true}>
      <FormLabel id={name + "-label"} htmlFor={name} required={required} className="py-3">{label}</FormLabel>
      <RadioGroup aria-labelledby={name + "-label"} defaultValue={value} name={name}>
        {options.map(({ label, value }, key) => (
          <FormControlLabel control={<Radio />} label={label} value={value} key={key} />
        ))}
      </RadioGroup>
      <FormErrors errors={errors} />
    </FormControl>
  </>)
}

export default FormRadioField;

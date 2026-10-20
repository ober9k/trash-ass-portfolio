import FormErrors from "@/components/forms/formErrors.tsx";
import type { RadioConfig, State } from "@/types/forms/fields";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

type Props = {
  config: RadioConfig,
  state:  State,
};

function FormRadioField(props: Props) {
  const { name, label, required, options } = props.config;
  const { value, errors } = props.state;

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

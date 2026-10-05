import { FormHelperText } from "@mui/material";

type Props = {
  errors: string[],
};

function FormErrors({ errors }: Props) {
  const hasErrors = (): boolean => {
    return errors.length > 0;
  };

  if (!hasErrors()) {
    return (<></>);
  }

  return (<>
    {errors.map((error, key) => (
      <FormHelperText key={key} error={true}>{error}</FormHelperText>
    ))}
  </>);
}

export default FormErrors;

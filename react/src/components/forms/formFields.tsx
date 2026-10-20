import FormRadioField from "@/components/forms/formRadioField";
import FormTextField from "@/components/forms/formTextField";
import type { Config, RadioConfig } from "@/types/forms/fields";
import type { Field } from "@/types/forms/fields/field";

type Props = {
  fields: Field[];
}

function FormFields(props: Props) {
  const { fields: formFields } = props;
  
  const isRadioField = (config: Config): config is RadioConfig => {
    return config.type === "radio";
  };

  return (<>
    {formFields.map(({ config, state }) => (
      (isRadioField(config)) ? (
        <FormRadioField key={config.name} config={config} state={state} />
      ) : (
        <FormTextField key={config.name} config={config} state={state} />
      )
    ))}
  </>);
}

export default FormFields;

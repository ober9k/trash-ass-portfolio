import FormRadioField from "@/components/forms/formRadioField";
import FormTextField from "@/components/forms/formTextField";
import type { FieldConfig, RadioFieldConfig } from "@/forms/transactions/fields";
import type { FormField } from "@/types/formState";

type Props = {
  formFields: FormField[];
}

function FormFields(props: Props) {
  const { formFields } = props;
  
  const isRadioField = (config: FieldConfig): config is RadioFieldConfig => {
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

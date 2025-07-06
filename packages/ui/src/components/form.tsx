import { Form as FormBaseUI } from "@base-ui-components/react/form";
import { ComponentProps } from "react";

type FormType = ComponentProps<typeof FormBaseUI>;

function Form(props: FormType) {
  return <FormBaseUI {...props} />;
}

export { Form };

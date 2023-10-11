import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schema,
  type FormFieldValues,
} from "services/validate/post-create-api.validate";

interface Props {
  children: React.ReactNode;
}

export function WriteFormProvider({ children }: Props) {
  const methods = useForm<FormFieldValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: undefined,
      subTitle: undefined,
      content: undefined,
      thumbnail: undefined,
      tags: undefined,
      disabledComment: false,
      tableOfContents: false,
      publishingDate: undefined,
      seo: {
        title: undefined,
        desc: undefined,
        image: undefined,
      },
    },
    reValidateMode: "onSubmit",
    criteriaMode: "firstError",
  });

  console.log("methods", methods.watch());

  return <FormProvider {...methods}>{children}</FormProvider>;
}

export function useWriteFormContext() {
  return useFormContext<FormFieldValues>();
}

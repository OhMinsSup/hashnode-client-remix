import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schema,
  type FormFieldValues,
} from "services/validate/post-create-api.validate";

interface Props {
  initialValues?: FetchRespSchema.PostDetailResp;
  children: React.ReactNode;
}

export function WriteFormProvider({ children, initialValues }: Props) {
  const methods = useForm<FormFieldValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialValues?.title ?? undefined,
      subTitle: initialValues?.subTitle ?? undefined,
      content: initialValues?.content ?? undefined,
      thumbnail: initialValues?.thumbnail
        ? {
            id: "cf",
            url: initialValues?.thumbnail,
          }
        : undefined,
      tags: undefined,
      disabledComment: initialValues?.disabledComment ?? false,
      tableOfContents: false,
      publishingDate: initialValues?.publishingDate
        ? new Date(initialValues?.publishingDate)
        : undefined,
      seo: {
        title: initialValues?.seo?.title ?? undefined,
        desc: initialValues?.seo?.desc ?? undefined,
        image: initialValues?.seo?.image,
      },
    },
    reValidateMode: "onSubmit",
    criteriaMode: "firstError",
  });

  console.log("initialValues", initialValues);

  return <FormProvider {...methods}>{children}</FormProvider>;
}

export function useWriteFormContext() {
  return useFormContext<FormFieldValues>();
}

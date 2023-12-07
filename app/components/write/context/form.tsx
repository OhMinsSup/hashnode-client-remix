import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schema,
  type FormFieldValues,
} from "~/services/validate/post-create-api.validate";

import type { SerializeFrom } from "@remix-run/cloudflare";

interface Props {
  initialValues?: SerializeFrom<FetchRespSchema.PostDetailResp>;
  children: React.ReactNode;
}

export function WriteFormProvider({ children, initialValues }: Props) {
  console.log(initialValues);
  const methods = useForm<FormFieldValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialValues?.title ?? undefined,
      subTitle: initialValues?.subtitle ?? undefined,
      content: initialValues?.content ?? undefined,
      thumbnail: initialValues?.postImage
        ? {
            id: initialValues?.postImage.id ?? null,
            url: initialValues?.postImage.publicUrl ?? null,
          }
        : undefined,
      tags: undefined,
      disabledComment: initialValues?.disabledComment ?? false,
      tableOfContents: false,
      publishingDate: initialValues?.publishingDate
        ? new Date(initialValues?.publishingDate)
        : undefined,
      seo: {
        title: initialValues?.postSeo?.title ?? undefined,
        desc: initialValues?.postSeo?.description ?? undefined,
        image: initialValues?.postSeo?.file
          ? {
              id: initialValues?.postSeo?.file.id ?? null,
              url: initialValues?.postSeo?.file.publicUrl ?? null,
            }
          : undefined,
      },
    },
    reValidateMode: "onSubmit",
    criteriaMode: "firstError",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

export function useWriteFormContext() {
  return useFormContext<FormFieldValues>();
}

import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schema,
  type FormFieldValues,
} from "~/services/validate/post-create-api.validate";
import { useEffect } from "react";
import { useWriteContext } from "~/components/write/context/useWriteContext";

interface Props {
  initialValues?: SerializeSchema.SerializePost<false>;
  children: React.ReactNode;
}

export function WriteFormProvider({ children, initialValues }: Props) {
  const { setSubtitleOpen } = useWriteContext();
  const methods = useForm<FormFieldValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      urlSlug: initialValues?.urlSlug ?? undefined,
      title: initialValues?.title ?? undefined,
      subTitle: initialValues?.subTitle ?? undefined,
      content: initialValues?.content ?? undefined,
      image: initialValues?.image ?? undefined,
      tags: initialValues?.PostTags.map((tag) => tag.name) ?? [],
      seo: {
        title: initialValues?.PostSeo.title ?? undefined,
        description: initialValues?.PostSeo.description ?? undefined,
        image: initialValues?.PostSeo.image ?? undefined,
      },
      config: {
        disabledComment: initialValues?.PostConfig.disabledComment ?? false,
        hiddenArticle: initialValues?.PostConfig.hiddenArticle ?? false,
        hasTableOfContents:
          initialValues?.PostConfig.hasTableOfContents ?? false,
        isDraft: initialValues?.PostConfig.isDraft ?? false,
        isMarkdown: initialValues?.PostConfig.isMarkdown ?? false,
        publishedAt: initialValues?.PostConfig.publishedAt ?? undefined,
      },
    },
    reValidateMode: "onSubmit",
    criteriaMode: "firstError",
  });

  useEffect(() => {
    if (initialValues?.subTitle && initialValues.subTitle.length > 0) {
      setSubtitleOpen();
    }
  }, [initialValues?.subTitle]);

  return <FormProvider {...methods}>{children}</FormProvider>;
}

export function useWriteFormContext() {
  return useFormContext<FormFieldValues>();
}

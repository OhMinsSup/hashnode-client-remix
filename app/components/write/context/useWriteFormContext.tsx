import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import type { FormFieldValues } from '~/services/validate/post-create-api.validate';
import { useWriteContext } from '~/components/write/context/useWriteContext';
import { useDeepCompareEffect } from '~/libs/hooks/useDeepCompareEffect';
import { schema } from '~/services/validate/post-create-api.validate';

interface Props {
  initialValues?: SerializeSchema.SerializePost<false>;
  children: React.ReactNode;
}

export const getInitialValues = (
  initialValues?: SerializeSchema.SerializePost<false>,
) => ({
  urlSlug: initialValues?.urlSlug || initialValues?.title || '',
  title: initialValues?.title ?? '',
  subTitle: initialValues?.subTitle ?? '',
  content: initialValues?.content || undefined,
  image: initialValues?.image ?? undefined,
  tags: initialValues?.PostTags.map((tag) => tag.name) ?? [],
  seo: {
    title: initialValues?.PostSeo.title ?? '',
    description: initialValues?.PostSeo.description ?? '',
    image: initialValues?.PostSeo.image ?? undefined,
  },
  config: {
    disabledComment: initialValues?.PostConfig.disabledComment ?? false,
    hiddenArticle: initialValues?.PostConfig.hiddenArticle ?? false,
    hasTableOfContents: initialValues?.PostConfig.hasTableOfContents ?? false,
    isDraft: initialValues?.PostConfig.isDraft ?? false,
    isMarkdown: initialValues?.PostConfig.isMarkdown ?? false,
    publishedAt: initialValues?.PostConfig.publishedAt ?? undefined,
  },
});

export const getDefaultValues = () => ({
  urlSlug: '',
  title: '',
  subTitle: '',
  content: undefined,
  image: undefined,
  tags: [],
  seo: {
    title: '',
    description: '',
    image: undefined,
  },
  config: {
    disabledComment: false,
    hiddenArticle: false,
    hasTableOfContents: false,
    isDraft: false,
    isMarkdown: false,
    publishedAt: undefined,
  },
});

export function WriteFormProvider({ children, initialValues }: Props) {
  const { setSubtitleOpen } = useWriteContext();

  const methods = useForm<FormFieldValues>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
    reValidateMode: 'onSubmit',
    criteriaMode: 'firstError',
  });

  useDeepCompareEffect(() => {
    methods.reset(getInitialValues(initialValues));
    if (initialValues?.subTitle && initialValues.subTitle.length > 0) {
      setSubtitleOpen();
    }
  }, [initialValues]);

  return <FormProvider {...methods}>{children}</FormProvider>;
}

export function useWriteFormContext() {
  return useFormContext<FormFieldValues>();
}

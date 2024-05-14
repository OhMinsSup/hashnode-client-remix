import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';

import type { FormFieldValues } from '~/services/validate/user-update-api.validate';
import { Form } from '~/components/ui/form';
import { useDeepCompareEffect } from '~/libs/hooks/useDeepCompareEffect';
import { schema } from '~/services/validate/user-update-api.validate';

interface Props {
  initialValues?: SerializeSchema.SerializeUser;
  children: React.ReactNode;
}

export const getInitialValues = (initialValues?: Props['initialValues']) => ({
  nickname: initialValues?.UserProfile?.nickname || undefined,
  username: initialValues?.UserProfile?.username || undefined,
  email: initialValues?.email || undefined,
  tagline: initialValues?.UserProfile?.tagline || undefined,
  image: initialValues?.UserProfile?.image || undefined,
  location: initialValues?.UserProfile?.location || undefined,
  bio: initialValues?.UserProfile?.bio || undefined,
  availableText: initialValues?.UserProfile?.availableText || undefined,
  skills: initialValues?.UserTags?.map((tag) => tag.name) || [],
  socials: {
    github: initialValues?.UserSocial?.github || undefined,
    facebook: initialValues?.UserSocial?.facebook || undefined,
    twitter: initialValues?.UserSocial?.twitter || undefined,
    instagram: initialValues?.UserSocial?.instagram || undefined,
    stackoverflow: initialValues?.UserSocial?.stackoverflow || undefined,
    youtube: initialValues?.UserSocial?.youtube || undefined,
    linkedin: initialValues?.UserSocial?.linkedin || undefined,
    website: initialValues?.UserSocial?.website || undefined,
  },
});

export const getDefaultValues = (): Partial<FormFieldValues> => ({
  nickname: undefined,
  username: undefined,
  email: undefined,
  tagline: undefined,
  image: undefined,
  location: undefined,
  bio: undefined,
  availableText: undefined,
  skills: [],
  socials: {
    github: undefined,
    facebook: undefined,
    twitter: undefined,
    instagram: undefined,
    stackoverflow: undefined,
    youtube: undefined,
    linkedin: undefined,
    website: undefined,
  },
});

export function UserProfileFormProvider({ children, initialValues }: Props) {
  const methods = useForm<FormFieldValues>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
    reValidateMode: 'onSubmit',
    criteriaMode: 'firstError',
  });

  useDeepCompareEffect(() => {
    methods.reset(getInitialValues(initialValues));
  }, [initialValues]);

  return <Form {...methods}>{children}</Form>;
}

export function useUserProfileFormContext() {
  return useFormContext<FormFieldValues>();
}

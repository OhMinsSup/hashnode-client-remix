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
  email: initialValues?.email || '',
  profile: {
    nickname: initialValues?.UserProfile?.nickname || '',
    username: initialValues?.UserProfile?.username || '',
    tagline: initialValues?.UserProfile?.tagline || '',
    image: initialValues?.UserProfile?.image || undefined,
    location: initialValues?.UserProfile?.location || '',
    bio: initialValues?.UserProfile?.bio || '',
    availableText: initialValues?.UserProfile?.availableText || '',
  },
  skills: initialValues?.UserTags?.map((tag) => tag.name) || [],
  social: {
    github: initialValues?.UserSocial?.github || '',
    facebook: initialValues?.UserSocial?.facebook || '',
    twitter: initialValues?.UserSocial?.twitter || '',
    instagram: initialValues?.UserSocial?.instagram || '',
    stackoverflow: initialValues?.UserSocial?.stackoverflow || '',
    youtube: initialValues?.UserSocial?.youtube || '',
    linkedin: initialValues?.UserSocial?.linkedin || '',
    website: initialValues?.UserSocial?.website || '',
  },
});

export const getDefaultValues = (): Partial<FormFieldValues> => ({
  profile: {
    nickname: '',
    username: '',
    image: undefined,
    tagline: '',
    location: '',
    bio: '',
    availableText: '',
  },
  email: '',
  skills: [],
  social: {
    github: '',
    facebook: '',
    twitter: '',
    instagram: '',
    stackoverflow: '',
    youtube: '',
    linkedin: '',
    website: '',
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

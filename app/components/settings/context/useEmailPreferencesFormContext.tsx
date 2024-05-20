import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';

import type { FormFieldValues } from '~/services/validate/user-email-update-api.validate';
import { Form } from '~/components/ui/form';
import { useDeepCompareEffect } from '~/libs/hooks/useDeepCompareEffect';
import { schema } from '~/services/validate/user-email-update-api.validate';

interface Props {
  initialValues?: Omit<SerializeSchema.SerializeUserEmail, 'id'>;
  children: React.ReactNode;
}

export const getInitialValues = (initialValues?: Props['initialValues']) => ({
  hashnodeWeekly: initialValues?.hashnodeWeekly ?? false,
  activityNotifications: initialValues?.activityNotifications ?? false,
  generalAnnouncements: initialValues?.generalAnnouncements ?? false,
  monthlyBlogStats: initialValues?.monthlyBlogStats ?? false,
  referralNotifications: initialValues?.referralNotifications ?? false,
  newFollowersWeekly: initialValues?.newFollowersWeekly ?? false,
});

export const getDefaultValues = (): Partial<FormFieldValues> => ({
  hashnodeWeekly: false,
  activityNotifications: false,
  generalAnnouncements: false,
  monthlyBlogStats: false,
  referralNotifications: false,
  newFollowersWeekly: false,
});

export function EmailPreferencesFormProvider({
  children,
  initialValues,
}: Props) {
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

export function useEmailPreferencesFormContext() {
  return useFormContext<FormFieldValues>();
}

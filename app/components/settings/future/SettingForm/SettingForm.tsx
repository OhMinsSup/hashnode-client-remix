import type { SubmitHandler } from 'react-hook-form';
import { useFormAction, useNavigation, useSubmit } from '@remix-run/react';

import type { FormFieldValues } from '~/services/validate/user-update-api.validate';
import { Icons } from '~/components/icons';
import { useUserProfileFormContext } from '~/components/settings/context/useUserProfileFormContext';
import { AboutYou } from '~/components/settings/future/AboutYou';
import { BasicInfo } from '~/components/settings/future/BasicInfo';
import { ProfileIdentity } from '~/components/settings/future/ProfileIdentity';
import { Social } from '~/components/settings/future/Social';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { cn } from '~/services/libs';

export default function SettingForm() {
  const submit = useSubmit();

  const form = useUserProfileFormContext();

  const action = useFormAction();

  const navigation = useNavigation();

  const isSubmitting =
    navigation.formMethod === 'PUT' && navigation.formAction === action;

  const onSubmit: SubmitHandler<FormFieldValues> = (input) =>
    submit(input, {
      method: 'put',
      replace: true,
      action,
      encType: 'application/json',
    });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn({
        'opacity-60': isSubmitting,
      })}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Basic Info</h3>
          <p className="text-sm text-muted-foreground">
            Update your basic info, such as your name and profile picture
          </p>
        </div>
        <BasicInfo />
        <Separator orientation="horizontal" />
        <div>
          <h3 className="text-lg font-medium">About You</h3>
          <p className="text-sm text-muted-foreground">
            Tell us about yourself, your interests, and your profession
          </p>
        </div>
        <AboutYou />
        <Separator orientation="horizontal" />
        <div>
          <h3 className="text-lg font-medium">Social</h3>
          <p className="text-sm text-muted-foreground">
            Connect your account with social media platforms
          </p>
        </div>
        <Social />
        <Separator orientation="horizontal" />
        <div>
          <h3 className="text-lg font-medium">Profile Identity</h3>
          <p className="text-sm text-muted-foreground">
            Change your username or email address
          </p>
        </div>
        <ProfileIdentity />
      </div>
      <Button type="submit" className="mt-8" disabled={isSubmitting}>
        {isSubmitting ? <Icons.spinner className="mr-2 animate-spin" /> : null}
        <span>Update</span>
      </Button>
    </form>
  );
}

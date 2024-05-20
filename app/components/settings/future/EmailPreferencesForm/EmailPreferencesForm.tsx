import { useFormAction, useNavigation, useSubmit } from '@remix-run/react';
import { type SubmitHandler } from 'react-hook-form';

import { Icons } from '~/components/icons';
import { useEmailPreferencesFormContext } from '~/components/settings/context/useEmailPreferencesFormContext';
import { Button } from '~/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '~/components/ui/form';
import { Switch } from '~/components/ui/switch';
import { cn } from '~/services/libs';
import { type FormFieldValues } from '~/services/validate/user-email-update-api.validate';

export default function EmailPreferencesForm() {
  const form = useEmailPreferencesFormContext();

  const submit = useSubmit();

  const action = useFormAction();

  const navigation = useNavigation();

  const isSubmitting =
    navigation.formMethod === 'PUT' && navigation.formAction === action;

  const onSubmit: SubmitHandler<FormFieldValues> = (input) => {
    submit(input as unknown as Record<string, any>, {
      method: 'put',
      encType: 'application/json',
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn({
        'opacity-60': isSubmitting,
      })}
    >
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="hashnodeWeekly"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Hashnode weekly</FormLabel>
                <FormDescription>
                  Curated weekly newsletter with best stories and discussions
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="activityNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Activities related to you and your content
                </FormLabel>
                <FormDescription>
                  Replies, Responses, Reactions, Mentions etc...
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="generalAnnouncements"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  General announcements
                </FormLabel>
                <FormDescription>
                  Product updates, feature additions, etc...
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monthlyBlogStats"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Monthly blog posts stats newsletter
                </FormLabel>
                <FormDescription>
                  Get monthly stats for your blog posts via email
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newFollowersWeekly"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  New Followers Weekly
                </FormLabel>
                <FormDescription>
                  Get weekly stats about new followers
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newFollowersWeekly"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Referral Notifications
                </FormLabel>
                <FormDescription>
                  Get notified on Successful Referrals, Hashnode Ambassador
                  Eligibility, Swag Kit Eligibility, etc...
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <Button type="submit" className="mt-8" disabled={isSubmitting}>
        {isSubmitting ? <Icons.spinner className="mr-2 animate-spin" /> : null}
        <span>Update</span>
      </Button>
    </form>
  );
}

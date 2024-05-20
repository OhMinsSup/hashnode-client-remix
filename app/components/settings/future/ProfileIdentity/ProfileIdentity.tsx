import { useUserProfileFormContext } from '~/components/settings/context/useUserProfileFormContext';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';

export default function ProfileIdentity() {
  const form = useUserProfileFormContext();
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormDescription>
              You have the option to change your username once. Please choose
              carefully as it cannot be changed again.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Email address</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormDescription>
              Changing your email address might break your OAuth sign-in if your
              social media accounts do not use the same email address. Please
              use magic link sign-in if you encounter such an issue.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

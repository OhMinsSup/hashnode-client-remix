import { useUserProfileFormContext } from '~/components/settings/context/useUserProfileFormContext';
import { InputProfile } from '~/components/settings/future/InputProfile';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';

export default function BasicInfo() {
  const form = useUserProfileFormContext();
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="profile.nickname"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Nickname</FormLabel>
            <FormControl>
              <Input placeholder="Enter your nickname" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="profile.tagline"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Profile Tagline</FormLabel>
            <FormControl>
              <Input placeholder="Software Developer @" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="space-y-4">
        <FormLabel>Profile Photo</FormLabel>
        <div className="h-40">
          <InputProfile />
        </div>
      </div>
      <FormField
        control={form.control}
        name="profile.location"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="California, US" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

import { useMemo } from 'react';

import { useUserProfileFormContext } from '~/components/settings/context/useUserProfileFormContext';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';

export default function Social() {
  const form = useUserProfileFormContext();

  const socialList = useMemo(
    () => [
      {
        id: 'socials.twitter' as const,
        title: 'Twitter Profile',
        placeholder: 'https://twitter.com/johndoe',
      },
      {
        id: 'socials.instagram' as const,
        title: 'Instagram Profile',
        placeholder: 'https://instagram.com/johndoe',
      },
      {
        id: 'socials.github' as const,
        title: 'GitHub Profile',
        placeholder: 'https://github.com/hashnode',
      },
      {
        id: 'socials.stackoverflow' as const,
        title: 'StackOverflow Profile',
        placeholder: 'https://stackoverflow.com/users/22656/jon-skeet',
      },
      {
        id: 'socials.facebook' as const,
        title: 'Facebook Profile',
        placeholder: 'https://facebook.com/johndoe',
      },
      {
        id: 'socials.website' as const,
        title: 'Website URL',
        placeholder: 'https://johndoe.com',
      },
      {
        id: 'socials.linkedin' as const,
        title: 'LinkedIn Profile',
        placeholder: 'https://www.linkedin.com/in/johndoe',
      },
      {
        id: 'socials.youtube' as const,
        title: 'YouTube Channel',
        placeholder: 'https://www.youtube.com/channel/channel-name',
      },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      {socialList.map((social) => (
        <FormField
          key={social.id}
          control={form.control}
          name={social.id}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>{social.title}</FormLabel>
              <FormControl>
                <Input type="url" placeholder={social.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
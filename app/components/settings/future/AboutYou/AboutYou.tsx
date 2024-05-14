import { useUserProfileFormContext } from '~/components/settings/context/useUserProfileFormContext';
import { InputTag } from '~/components/settings/future/InputTag';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Textarea } from '~/components/ui/textarea';

export default function AboutYou() {
  const form = useUserProfileFormContext();

  const count = form.watch('availableText')?.length ?? 0;

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>Profile Bio (About you)</FormLabel>
            <FormControl>
              <Textarea
                className="min-h-[30vh]"
                placeholder="I am a developer from"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="space-y-1">
        <FormLabel>Tech Stack</FormLabel>
        <InputTag />
      </div>
      <FormField
        control={form.control}
        name="availableText"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>Available for</FormLabel>
            <FormControl>
              <Textarea
                className="min-h-[30vh]"
                placeholder="I am available for mentoring"
                {...field}
              />
            </FormControl>
            <FormMessage />
            <small className="mt-1 block leading-tight text-slate-600">
              {count}/140
            </small>
          </FormItem>
        )}
      />
    </div>
  );
}

import { useCallback } from 'react';
import { useForm, useFormContext, useWatch } from 'react-hook-form';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useSearchDialogContext } from '~/context/useSearchDialogContext';
import { FormFieldValues, resolver } from '~/services/validate/search.validate';

export default function SearchhDialog() {
  const { dialog, changeDialogState } = useSearchDialogContext();

  const onOpenChange = useCallback(
    (open: boolean) => {
      changeDialogState({ isOpen: open });
    },
    [changeDialogState],
  );

  return (
    <Dialog open={dialog.isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" aria-label="Open Hashnode searchbar">
          <Icons.search />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[768px]">
        <DialogHeader>
          <DialogTitle>Search Hashnode</DialogTitle>
        </DialogHeader>
        <SearchProvider>
          <SearchForm />
          <SearchResults />
        </SearchProvider>
      </DialogContent>
    </Dialog>
  );
}

interface SearchProviderProps {
  children: React.ReactNode;
}

function SearchProvider({ children }: SearchProviderProps) {
  const form = useForm<FormFieldValues>({
    resolver,
    defaultValues: {
      q: '',
    },
    reValidateMode: 'onBlur',
  });

  return <Form {...form}>{children}</Form>;
}

function SearchForm() {
  const ctx = useFormContext<FormFieldValues>();

  const onSubmit = (input: FormFieldValues) => {
    console.log(input);
  };

  return (
    <section className="mb-4">
      <form
        onSubmit={ctx.handleSubmit(onSubmit)}
        className="relative flex flex-1 flex-row items-stretch lg:col-span-5"
      >
        <FormField
          control={ctx.control}
          name="q"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormControl>
                <Input
                  className="py-5"
                  placeholder="Start typing to search"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </section>
  );
}

function SearchResults() {
  const watch = useWatch<FormFieldValues>();
  console.log(watch.q);
  return (
    <section className="flex items-center justify-center p-2 text-sm text-slate-500">
      <Icons.search className="mr-2 size-4 fill-transparent stroke-current" />
      <span>Search for tags, people, articles, and more</span>
    </section>
  );
}

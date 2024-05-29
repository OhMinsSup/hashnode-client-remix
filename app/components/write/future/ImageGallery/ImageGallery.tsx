import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { ImageGalleryCardList } from '~/components/write/future/ImageGalleryCardList';

const schema = z.object({
  keyword: z.string().optional(),
});

type FormFieldValues = z.infer<typeof schema>;

export default function ImageGallery() {
  const form = useForm<FormFieldValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      keyword: '',
    },
  });

  const [keyword, setKeyword] = useState('');

  const { field } = useController({
    control: form.control,
    name: 'keyword',
  });

  const onSubmit = (input: FormFieldValues) => {
    setKeyword(input.keyword ?? '');
  };

  const onReset = () => {
    form.reset();
    setKeyword('');
  };

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-5 flex w-full flex-row space-x-2"
      >
        <div className="relative flex-1">
          <Icons.search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="text"
            autoComplete="off"
            className="px-8"
            placeholder="Type something and press enter"
            {...field}
          />
          <Icons.close
            className="absolute right-2 top-2.5 size-4 text-muted-foreground"
            onClick={onReset}
          />
        </div>
        <Button type="submit" className=" inline-flex">
          Search
        </Button>
      </form>
      <React.Suspense fallback={<>Loading...</>}>
        <ImageGalleryCardList keyword={keyword} />
      </React.Suspense>
    </div>
  );
}

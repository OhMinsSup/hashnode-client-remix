import { useTransition } from 'react';
import { useLoaderData } from '@remix-run/react';

import { type RoutesLoaderData } from '~/.server/routes/write/write.$id.loader';
import { BlockEditor } from '~/components/editor/future/BlockEditor';
import { useWriteFormContext } from '~/components/write/context/useWriteFormContext';

export default function Editor() {
  const data = useLoaderData<RoutesLoaderData>();

  const initialValues = data?.result as SerializeSchema.SerializePost<false>;

  const { setValue } = useWriteFormContext();

  const [, startTransition] = useTransition();

  return (
    <BlockEditor
      initialContent={initialValues.content}
      onUpdate={({ editor }) => {
        startTransition(() => {
          setValue('content', editor.getHTML(), {
            shouldDirty: true,
          });
          setValue('meta', JSON.stringify(editor.getJSON()));
        });
      }}
    />
  );
}

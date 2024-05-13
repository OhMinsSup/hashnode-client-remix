import { useTransition } from 'react';

import { BlockEditor } from '~/components/editor/future/BlockEditor';
import { BlockEditorProps } from '~/components/editor/future/BlockEditor/BlockEditor';
import { useWriteFormContext } from '~/components/write/context/useWriteFormContext';

interface EditorProps extends Pick<BlockEditorProps, 'initialContent'> {}

export default function Editor({ initialContent }: EditorProps) {
  const { setValue } = useWriteFormContext();

  const [, startTransition] = useTransition();

  return (
    <BlockEditor
      initialContent={initialContent}
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

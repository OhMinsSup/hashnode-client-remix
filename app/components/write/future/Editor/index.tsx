import React from 'react';

import type { BlocknoteEditorProps } from '~/components/blocknote-editor/BlocknoteEditor';
import { ClientOnly } from '~/components/shared/future/ClientOnly';
import { useWriteFormContext } from '~/components/write/context/useWriteFormContext';

const BlocknoteEditor = React.lazy(
  () => import('~/components/blocknote-editor/BlocknoteEditor'),
);

interface EditorProps
  extends Pick<BlocknoteEditorProps, 'editable' | 'initialHTML'> {}

export default function Editor({ initialHTML, editable }: EditorProps) {
  const { setValue, watch } = useWriteFormContext();

  const isMarkdown = watch('config.isMarkdown');

  return (
    <ClientOnly>
      <React.Suspense fallback={null}>
        <BlocknoteEditor
          blockType={isMarkdown ? 'markdown' : 'html'}
          initialHTML={initialHTML}
          editable={editable}
          onChange={(_, value) => {
            setValue('content', value, {
              shouldDirty: true,
            });
          }}
        />
      </React.Suspense>
    </ClientOnly>
  );
}

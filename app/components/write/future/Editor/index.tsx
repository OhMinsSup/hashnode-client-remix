import { BlocknoteEditor } from '~/components/blocknote-editor';
import { BlocknoteEditorProps } from '~/components/blocknote-editor/BlocknoteEditor';
import { ClientOnly } from '~/components/shared/future/ClientOnly';
import { useWriteFormContext } from '~/components/write/context/useWriteFormContext';

interface EditorProps
  extends Pick<BlocknoteEditorProps, 'editable' | 'initialHTML'> {}

export default function Editor({ initialHTML, editable }: EditorProps) {
  const { setValue, watch } = useWriteFormContext();

  const isMarkdown = watch('config.isMarkdown');

  return (
    <ClientOnly>
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
    </ClientOnly>
  );
}

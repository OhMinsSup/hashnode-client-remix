import {
  BlockConfig,
  BlockNoteEditor,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';

import '@blocknote/core/fonts/inter.css';

import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/shadcn';

import '@blocknote/shadcn/style.css';

import { useCallback, useEffect, useTransition } from 'react';

import { useTheme } from '~/context/useThemeContext';
import { getPath } from '~/routes/api.v1.assets.upload';
import { fetchHandler } from '~/services/api/fetch';

type BlockType = 'html' | 'markdown';

export interface BlocknoteEditorProps {
  blockType?: BlockType;
  initialHTML?: string;
  onChange?: (
    editor: BlockNoteEditor<
      Record<string, BlockConfig>,
      InlineContentSchema,
      StyleSchema
    >,
    value: string,
    blockType: BlockType,
  ) => void;
  editable?: boolean;
  options?: Parameters<typeof useCreateBlockNote>[0];
  deps?: Parameters<typeof useCreateBlockNote>[1];
}

function Editor({
  options,
  deps,
  editable,
  blockType = 'html',
  onChange,
  initialHTML,
}: BlocknoteEditorProps) {
  const [theme] = useTheme();
  // Creates a new editor instance.
  const editor = useCreateBlockNote(
    {
      ...options,
      uploadFile: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('uploadType', 'IMAGE');
        formData.append('mediaType', 'IMAGE');

        const response = await fetchHandler<
          RemixDataFlow.Response<FetchRespSchema.File>,
          'turbo'
        >(getPath(), {
          baseURL: window.location.origin,
          isSingleFetch: true,
          method: 'POST',
          body: formData,
        });

        if (!response._data) {
          throw new Error('Failed to upload file');
        }

        if (!response._data.data) {
          throw new Error('Failed to upload file');
        }

        return response._data.data.result.publicUrl;
      },
    },
    deps,
  );

  const [, startTransition] = useTransition();

  const inputChanged = useCallback(async () => {
    // Whenever the current HTML content changes, converts it to an array of
    // Block objects and replaces the editor's content with them.
    const values =
      blockType === 'html'
        ? await editor.blocksToHTMLLossy(editor.document)
        : await editor.blocksToMarkdownLossy(editor.document);

    startTransition(() => {
      onChange?.(editor, values, blockType);
    });
  }, [blockType, editor, onChange]);

  // For initialization; on mount, convert the initial HTML to blocks and replace the default editor's content
  useEffect(() => {
    async function loadInitialHTML() {
      if (!initialHTML) return;
      const blocks =
        blockType === 'html'
          ? await editor.tryParseHTMLToBlocks(initialHTML)
          : await editor.tryParseMarkdownToBlocks(initialHTML);

      editor.replaceBlocks(editor.document, blocks);
    }
    loadInitialHTML();
  }, [editor, blockType]);

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      theme={theme ?? 'light'}
      onChange={inputChanged}
      shadCNComponents={
        {
          // Pass modified ShadCN components from your project here.
          // Otherwise, the default ShadCN components will be used.
        }
      }
    />
  );
}

export default function BlocknoteEditor(props: BlocknoteEditorProps) {
  return <Editor {...props} />;
}

import { Content, Editor, EditorOptions, useEditor } from '@tiptap/react';

import { ExtensionKit } from '~/components/editor/future/extensions/extension-kit';
import { isBrowser } from '~/libs/browser-utils/dom';

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export interface UseBlockEditorProps {
  initialContent?: Content;
  onCreate?: EditorOptions['onCreate'];
  onUpdate?: EditorOptions['onUpdate'];
  onDestroy?: EditorOptions['onDestroy'];
  editable?: EditorOptions['editable'];
}

export const useBlockEditor = ({
  initialContent,
  editable,
  onCreate,
  onUpdate,
  onDestroy,
}: UseBlockEditorProps) => {
  const editor = useEditor(
    {
      editable,
      autofocus: true,
      onCreate: (props) => {
        if (props.editor.isEmpty && initialContent) {
          props.editor.commands.setContent(initialContent);
        }
        onCreate?.(props);
      },
      onUpdate: (props) => {
        onUpdate?.(props);
      },
      onDestroy: (props) => {
        onDestroy?.(props);
      },
      extensions: [...ExtensionKit()],
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full',
        },
      },
    },
    [],
  );

  const characterCount = editor?.storage.characterCount || {
    characters: () => 0,
    words: () => 0,
  };

  if (isBrowser) {
    window.editor = editor;
  }

  return {
    editor,
    characterCount,
  };
};

import { Editor, useEditor } from "@tiptap/react";
import { ExtensionKit } from "~/components/editor/future/extensions/extension-kit";
import { isBrowser } from "~/libs/browser-utils";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = () => {
  const editor = useEditor(
    {
      autofocus: true,
      onCreate: ({ editor }) => {
        console.log("editor created", editor);
        // provider?.on("synced", () => {
        //   if (editor.isEmpty) {
        //     editor.commands.setContent(initialContent);
        //   }
        // });
      },
      extensions: [...ExtensionKit()],
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: "min-h-full",
        },
      },
    },
    []
  );

  console.log(editor);

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

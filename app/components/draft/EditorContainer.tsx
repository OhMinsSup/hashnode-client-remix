import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import Editor from "~/components/shared/Editor";
import type { FormFieldValues } from "~/routes/draft";
import type { API } from "@editorjs/editorjs";
import { useDraftContext } from "~/context/useDraftContext";

export default function EditorContainer() {
  const { setValue } = useFormContext<FormFieldValues>();
  const { setEditorJSInstance } = useDraftContext();

  const onChangeEditor = useCallback(
    async (api: API) => {
      const blocks = await api.saver.save();
      if (!blocks) return;
      const data = JSON.stringify(blocks);

      setValue("content", data, {
        shouldDirty: true,
        shouldValidate: true,
      });

      return data;
    },
    [setValue]
  );

  return <Editor onReady={setEditorJSInstance} onChange={onChangeEditor} />;
}

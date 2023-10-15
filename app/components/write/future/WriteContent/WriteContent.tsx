import React from "react";
import styles from "./styles.module.css";
import { TipTapEditor } from "~/components/shared/future/Tiptap";
import { useWriteFormContext } from "../../context/form";

interface WriteConrentProps {
  header?: React.ReactNode;
  drawer?: React.ReactNode;
}

export default function WriteConrent({ header, drawer }: WriteConrentProps) {
  const { setValue, watch } = useWriteFormContext();

  const html = watch("content") ?? "";

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {header}
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <div className={styles.editor}>
              <TipTapEditor
                value={html}
                editable={true}
                debouncedUpdatesEnabled={true}
                onChange={(description: Object, description_html: string) => {
                  setValue("content", description_html);
                }}
              />
            </div>
          </div>
        </div>
        {drawer}
      </div>
    </div>
  );
}

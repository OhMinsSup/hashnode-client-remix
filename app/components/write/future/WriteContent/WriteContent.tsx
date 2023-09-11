import React from "react";
import styles from "./styles.module.css";
import { TipTapEditor } from "~/components/shared/future/Tiptap";

interface WriteConrentProps {
  header?: React.ReactNode;
}

export default function WriteConrent({ header }: WriteConrentProps) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {header}
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <div className={styles.editor}>
              <TipTapEditor
                value={"<p>test</p>"}
                editable={true}
                debouncedUpdatesEnabled={true}
                onChange={(description: Object, description_html: string) => {
                  console.log(description, description_html);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

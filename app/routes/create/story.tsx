import React from "react";
import { ActionButtonGroup, Title } from "~/components/posts";
import { Editor } from "~/components/ui/Editor";
import { WriterHeader } from "~/components/ui/Header";

import styles from "~/styles/editor.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function CreateStory() {
  return (
    <>
      <WriterHeader />
      <div className="mx-auto grid w-full grid-cols-12 px-2 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] 2xl:grid-cols-10 2xl:px-5">
        <div className="col-span-12 xl:col-span-10 xl:col-start-2 2xl:col-span-6 2xl:col-start-3">
          <div className="relative w-full pt-5">
            <div className="create-post">
              {/* Step1 */}
              <ActionButtonGroup />
              {/* Step2 */}
              <Title />
              {/* Step3 */}
              <div className="relative z-20">
                <Editor />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

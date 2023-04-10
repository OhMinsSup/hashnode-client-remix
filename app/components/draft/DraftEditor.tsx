import React from "react";
import classNames from "classnames";
import json from "superjson";

// hooks
import { useFetcher } from "@remix-run/react";
import { useMedia } from "react-use";
import { useDraftContext } from "~/context/useDraftContext";
import { useFormContext } from "react-hook-form";

// components
import DraftEditorHeader from "~/components/draft/DraftEditorHeader";
import DraftEdtiorContent from "~/components/draft/DraftEdtiorContent";

// types
import type { SubmitHandler } from "react-hook-form";
import type { FormFieldValues } from "~/routes/draft";

const DraftPublishDrawer = React.lazy(
  () => import("~/components/draft/DraftPublishDrawer")
);

interface DraftEditorProps {
  action?: string;
}

const DraftEditor: React.FC<DraftEditorProps> = ({
  action = "/draft?index",
}) => {
  const fetcher = useFetcher();
  const { visibility, setFormInstance, $form } = useDraftContext();
  const { handleSubmit } = useFormContext<FormFieldValues>();

  const isMobile = useMedia("(max-width: 768px)", false);

  const onSubmit: SubmitHandler<FormFieldValues> = (input) => {
    fetcher.submit(
      {
        body: json.stringify(input),
      },
      {
        method: "POST",
        action,
      }
    );
  };

  return (
    <form
      ref={($) => {
        if ($?.isSameNode($form)) {
          return;
        }

        if ($ && !$form) {
          setFormInstance($);
        }
      }}
      onSubmit={handleSubmit(onSubmit)}
      data-hydrating-signal
      className={classNames({
        "draft-editor": visibility.isLeftSidebarVisible,
        "draft-editor--close-sidebar": !visibility.isLeftSidebarVisible,
        "!hidden": isMobile && visibility.isLeftSidebarVisible,
      })}
    >
      <DraftEditorHeader />
      <DraftEdtiorContent />
      <React.Suspense fallback={<>Loading....</>}>
        <DraftPublishDrawer />
      </React.Suspense>
    </form>
  );
};

export default DraftEditor;

import React, { useCallback } from "react";
import classNames from "classnames";
import Json from "superjson";

// hooks
import { useFetcher } from "@remix-run/react";
import { useMediaQuery } from "~/libs/hooks/useMediaQuery";

import { useDraftContext } from "~/context/useDraftContext";
import { useFormContext } from "react-hook-form";

// components
import DraftEditorHeader from "~/components/draft/DraftEditorHeader";
import DraftEditorContent from "~/components/draft/DraftEditorContent";
import DraftPublishDrawer from "~/components/draft/DraftPublishDrawer";

// types
import type { SubmitHandler } from "react-hook-form";
import type { FormFieldValues } from "~/routes/draft";

interface DraftEditorProps {
  action?: string;
}

export default function DraftEditor({
  action = "/draft?index",
}: DraftEditorProps) {
  const fetcher = useFetcher();
  const { visibility, setFormInstance, $form } = useDraftContext();
  const { handleSubmit } = useFormContext<FormFieldValues>();

  const isMobile = useMediaQuery("(max-width: 768px)", false);

  const onSubmit: SubmitHandler<FormFieldValues> = useCallback(
    (input) => {
      fetcher.submit(
        {
          body: Json.stringify(input),
        },
        {
          method: "POST",
          action,
          replace: true,
        }
      );
    },
    [action, fetcher]
  );

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
      <DraftEditorContent />
      <DraftPublishDrawer />
    </form>
  );
}

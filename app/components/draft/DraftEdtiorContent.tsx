import React, { useEffect, useRef } from "react";
import { useDraftContext } from "~/context/useDraftContext";
import { getTargetElement } from "~/libs/browser-utils";

const DraftEdtiorContent = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { setFormInstance } = useDraftContext();

  useEffect(() => {
    const $ = getTargetElement(formRef);
    if ($) setFormInstance($);
  }, []);

  return (
    <div className="draft-editor--content">
      <div className="content-wrapper">
        <form className="content" ref={formRef}>
          DraftEdtiorContent
        </form>
      </div>
    </div>
  );
};

export default DraftEdtiorContent;

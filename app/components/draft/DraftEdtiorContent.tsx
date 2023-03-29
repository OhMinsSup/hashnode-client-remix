import React, { useEffect, useRef } from "react";
import * as Popover from "@radix-ui/react-popover";
import { useDraftContext } from "~/context/useDraftContext";
import { getTargetElement } from "~/libs/browser-utils";
import { Icons } from "../shared/Icons";
import DraftImageCoverPopover from "./DraftImageCoverPopover";

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
          <div>
            <div className="editor-toolbar-header">
              <DraftImageCoverPopover />
              <button type="button" className="btn-toolbar">
                <Icons.SubTitle className="icon__base mr-2 stroke-current" />
                <span>Add Subtitle</span>
              </button>
            </div>
            <div className="editor-title"></div>
          </div>
          {/* editor content */}
          DraftEdtiorContent
        </form>
      </div>
    </div>
  );
};

export default DraftEdtiorContent;

import React, { useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useDraftContext } from "~/context/useDraftContext";
import { getTargetElement } from "~/libs/browser-utils";
import { Icons } from "../shared/Icons";

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
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button type="button" className="btn-toolbar">
                    <Icons.Media className="icon--base mr-2 stroke-current" />
                    <span>Add Cover</span>
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="DialogOverlay" />
                  <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">
                      Edit profile
                    </Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                      Make changes to your profile here. Click save when you're
                      done.
                    </Dialog.Description>
                    <fieldset className="Fieldset">
                      <label className="Label" htmlFor="name">
                        Name
                      </label>
                      <input
                        className="Input"
                        id="name"
                        defaultValue="Pedro Duarte"
                      />
                    </fieldset>
                    <fieldset className="Fieldset">
                      <label className="Label" htmlFor="username">
                        Username
                      </label>
                      <input
                        className="Input"
                        id="username"
                        defaultValue="@peduarte"
                      />
                    </fieldset>
                    <div
                      style={{
                        display: "flex",
                        marginTop: 25,
                        justifyContent: "flex-end",
                      }}
                    >
                      <Dialog.Close asChild>
                        <button className="Button green">Save changes</button>
                      </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                      <button className="IconButton" aria-label="Close">
                        {/* <Cross2Icon /> */}
                      </button>
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              <button type="button" className="btn-toolbar">
                <Icons.SubTitle className="icon--base mr-2 stroke-current" />
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

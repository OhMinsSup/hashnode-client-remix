import React from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Tabs from "@radix-ui/react-tabs";
import { Icons } from "../shared/Icons";

function DraftImageCoverPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button type="button" className="btn-toolbar">
          <Icons.Media className="icon__base mr-2 stroke-current" />
          <span>Add Cover</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="popover__cover" sideOffset={5}>
          <DraftImageCoverPopover.Tabs />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default DraftImageCoverPopover;

DraftImageCoverPopover.Tabs = function DraftEdtiorContentTabs() {
  return (
    <Tabs.Root className="horizontal__container" defaultValue="tab1">
      <Tabs.List
        className="tabs__cover outline-none"
        aria-label="Manage your account"
      >
        <Tabs.Trigger className="tab__item" value="tab1">
          <span>Upload</span>
        </Tabs.Trigger>
        <Tabs.Trigger className="tab__item" value="tab2">
          <span>Library</span>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="TabsContent" value="tab1">
        <p className="Text">
          Make changes to your account here. Click save when you're done.
        </p>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="name">
            Name
          </label>
          <input className="Input" id="name" defaultValue="Pedro Duarte" />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="username">
            Username
          </label>
          <input className="Input" id="username" defaultValue="@peduarte" />
        </fieldset>
        <div
          style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}
        >
          <button className="Button green">Save changes</button>
        </div>
      </Tabs.Content>
      <Tabs.Content className="TabsContent" value="tab2">
        <p className="Text">
          Change your password here. After saving, you'll be logged out.
        </p>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="currentPassword">
            Current password
          </label>
          <input className="Input" id="currentPassword" type="password" />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="newPassword">
            New password
          </label>
          <input className="Input" id="newPassword" type="password" />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input className="Input" id="confirmPassword" type="password" />
        </fieldset>
        <div
          style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}
        >
          <button className="Button green">Change password</button>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

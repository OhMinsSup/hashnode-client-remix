import React, { useState } from "react";

// hooks
import { ASSET_URL } from "~/constants/constant";

// components
import { DraftIcon, MoonIcon, NotificationIcon } from "~/components/ui/Icon";
import Button from "~/components/ui/shared/Button";
import PopoverTrigger from "~/components/ui/shared/PopoverTrigger";
import { SimpleDialog } from "~/components/ui/shared/Dialog";
import UserMenuPopover from "~/components/ui/header/UserMenuPopover";

interface ItemGroupProps {}

const ItemGroup: React.FC<ItemGroupProps> = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="item-group">
      <div className="first-item">
        <Button
          id="changelogWidgetTrigger"
          aria-label="changelog"
          className="changelog-btn"
        >
          <DraftIcon className="icon-md" />
        </Button>
      </div>

      <Button aria-label="Toggle theme" className="theme-btn">
        <MoonIcon className="icon-md" />
      </Button>

      <div className="notifications">
        <Button className="notification-btn" aria-label="Notifications">
          <NotificationIcon className="icon-md" />
          <span className="absolute right-[-0.25rem] top-[-0.25rem] rounded-full bg-red-500 px-2 font-bold text-white">
            1
          </span>
        </Button>
      </div>

      <PopoverTrigger
        eleProps={{
          className: "profile",
        }}
        triggerButtonProps={{
          "aria-label": "Profile Dropdown",
          className: "profile-btn",
        }}
        placement="bottom"
        label={
          <div className="container">
            <img
              className="lazyload blur-up rounded-full"
              data-src={ASSET_URL.DEFAULT_AVATAR}
              alt="Profile"
            />
          </div>
        }
        isOpen={open}
        onOpenChange={setOpen}
      >
        <SimpleDialog>
          <UserMenuPopover />
        </SimpleDialog>
      </PopoverTrigger>
    </div>
  );
};

export default ItemGroup;

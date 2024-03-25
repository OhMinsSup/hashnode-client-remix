import React, { useCallback } from "react";
import styles from "./styles.module.css";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Popover from "@radix-ui/react-popover";

import { cn } from "~/utils/utils";
import { useWriteContext } from "~/context/useWriteContext";

export default function WriteRightHeader() {
  const { open } = useWriteContext();

  const onOpen = useCallback(() => {
    open();
  }, [open]);

  return (
    <>
      <WriteRightHeader.HashnodeAiButton />
      {/* <WriteRightHeader.MenuPopover /> */}
      <div
        data-orientation="vertical"
        aria-orientation="vertical"
        role="separator"
        className={styles.divider}
      ></div>
      {/* <button type="button" className={styles.btn_preview}>
        <span>Preview</span>
      </button> */}
      <button type="button" className={styles.btn_publish} onClick={onOpen}>
        <span>Publish</span>
      </button>
    </>
  );
}

WriteRightHeader.HashnodeAiButton =
  function WriteRightHeaderHashnodeAiButton() {
    return (
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button type="button" className={cn(styles.group, styles.btn_ai)}>
              <svg className={styles.icon_01} viewBox="0 0 20 20" fill="none">
                <path
                  d="M8.66394 4.33632C5.17312 4.33632 2.34326 7.16619 2.34326 10.657C2.34326 14.1478 5.17312 16.9777 8.66394 16.9777C9.38409 16.9777 10.0017 16.8751 10.5751 16.67C11.1171 16.4761 11.3881 16.3792 11.4921 16.3547C12.4515 16.1291 12.8495 16.7866 13.6765 16.9244C14.0826 16.9921 14.444 16.6595 14.4103 16.2492C14.3808 15.8904 14.1327 15.551 14.0336 15.2065C13.8278 14.4901 14.1071 13.947 14.4022 13.31M14.908 2.99143L14.3577 4.42232C14.226 4.76469 14.1602 4.93588 14.0578 5.07987C13.967 5.20749 13.8555 5.31899 13.7279 5.40974C13.5839 5.51213 13.4127 5.57797 13.0703 5.70965L11.6395 6.25999M14.908 2.99143L15.4584 4.42232C15.5901 4.76469 15.6559 4.93588 15.7583 5.07987C15.849 5.20749 15.9605 5.31899 16.0881 5.40974C16.2321 5.51213 16.4033 5.57797 16.7457 5.70965L18.1766 6.25999M14.908 2.99143L14.908 9.52856M18.1766 6.25999L16.7457 6.81034C16.4033 6.94202 16.2321 7.00786 16.0881 7.11025C15.9605 7.20099 15.849 7.3125 15.7583 7.44012C15.6559 7.58411 15.5901 7.7553 15.4584 8.09767L14.908 9.52856M18.1766 6.25999H11.6395M14.908 9.52856L14.3577 8.09767C14.226 7.75529 14.1602 7.58411 14.0578 7.44012C13.967 7.3125 13.8555 7.20099 13.7279 7.11025C13.5839 7.00786 13.4127 6.94202 13.0703 6.81034L11.6395 6.25999M8.8198 14.0811C7.29678 14.0811 6.01705 13.0394 5.65421 11.6297H11.9854C11.6226 13.0394 10.3428 14.0811 8.8198 14.0811Z"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <svg className={styles.icon_02} fill="none" viewBox="0 0 20 20">
                <path
                  d="M8.66394 4.33632C5.17312 4.33632 2.34326 7.16619 2.34326 10.657C2.34326 14.1478 5.17312 16.9777 8.66394 16.9777C9.38409 16.9777 10.0017 16.8751 10.5751 16.67C11.1171 16.4761 11.3881 16.3792 11.4921 16.3547C12.4515 16.1291 12.8495 16.7866 13.6765 16.9244C14.0826 16.9921 14.444 16.6595 14.4103 16.2492C14.3808 15.8904 14.1327 15.551 14.0336 15.2065C13.8278 14.4901 14.1071 13.947 14.4022 13.31M14.908 2.99143L14.3577 4.42232C14.226 4.76469 14.1602 4.93588 14.0578 5.07987C13.967 5.20749 13.8555 5.31899 13.7279 5.40974C13.5839 5.51213 13.4127 5.57797 13.0703 5.70965L11.6395 6.25999M14.908 2.99143L15.4584 4.42232C15.5901 4.76469 15.6559 4.93588 15.7583 5.07987C15.849 5.20749 15.9605 5.31899 16.0881 5.40974C16.2321 5.51213 16.4033 5.57797 16.7457 5.70965L18.1766 6.25999M14.908 2.99143L14.908 9.52856M18.1766 6.25999L16.7457 6.81034C16.4033 6.94202 16.2321 7.00786 16.0881 7.11025C15.9605 7.20099 15.849 7.3125 15.7583 7.44012C15.6559 7.58411 15.5901 7.7553 15.4584 8.09767L14.908 9.52856M18.1766 6.25999H11.6395M14.908 9.52856L14.3577 8.09767C14.226 7.75529 14.1602 7.58411 14.0578 7.44012C13.967 7.3125 13.8555 7.20099 13.7279 7.11025C13.5839 7.00786 13.4127 6.94202 13.0703 6.81034L11.6395 6.25999M8.8198 14.0811C7.29678 14.0811 6.01705 13.0394 5.65421 11.6297H11.9854C11.6226 13.0394 10.3428 14.0811 8.8198 14.0811Z"
                  stroke="url(#paint0_linear_3837_38798)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <defs>
                  <linearGradient
                    id="paint0_linear_3837_38798"
                    x1="14.5894"
                    y1="0.39055"
                    x2="5.72267"
                    y2="19.1497"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#3466F6"></stop>
                    <stop offset="0.0001" stopColor="#3466F6"></stop>
                    <stop offset="1" stopColor="#7C3AED"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content className={styles.tooltip} sideOffset={5}>
            Hashnode AI
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  };

WriteRightHeader.MenuPopover = function WriteRightHeaderMenuPopover() {
  return (
    <div className="relative">
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            type="button"
            className={styles.btn_menu}
            aria-label="Toggle more options"
          >
            <svg fill="none" viewBox="0 0 20 20">
              <path
                d="m5 7.5 5 5 5-5"
                stroke="stroke-current"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className={styles.popover_menu_content}
            style={{ minWidth: 290 }}
            sideOffset={5}
            align="end"
          >
            <div className="flex flex-col gap-2.5">
              <p className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">
                Dimensions
              </p>
              <fieldset className="flex gap-5 items-center">
                <label
                  className="text-[13px] text-violet11 w-[75px]"
                  htmlFor="width"
                >
                  Width
                </label>
                <input
                  className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                  id="width"
                  defaultValue="100%"
                />
              </fieldset>
              <fieldset className="flex gap-5 items-center">
                <label
                  className="text-[13px] text-violet11 w-[75px]"
                  htmlFor="maxWidth"
                >
                  Max. width
                </label>
                <input
                  className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                  id="maxWidth"
                  defaultValue="300px"
                />
              </fieldset>
              <fieldset className="flex gap-5 items-center">
                <label
                  className="text-[13px] text-violet11 w-[75px]"
                  htmlFor="height"
                >
                  Height
                </label>
                <input
                  className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                  id="height"
                  defaultValue="25px"
                />
              </fieldset>
              <fieldset className="flex gap-5 items-center">
                <label
                  className="text-[13px] text-violet11 w-[75px]"
                  htmlFor="maxHeight"
                >
                  Max. height
                </label>
                <input
                  className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                  id="maxHeight"
                  defaultValue="none"
                />
              </fieldset>
            </div>
            <Popover.Close
              className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
              aria-label="Close"
            >
              {/* <Cross2Icon /> */}
            </Popover.Close>
            <Popover.Arrow className="fill-white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

WriteRightHeader.PublishButton = function WriteRightHeaderPublishButton() {};

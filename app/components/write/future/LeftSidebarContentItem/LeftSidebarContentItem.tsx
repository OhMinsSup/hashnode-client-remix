import React, { useCallback, useRef, useState, useTransition } from "react";
import * as Popover from "@radix-ui/react-popover";
import styles from "./styles.module.css";
import { cn } from "~/utils/util";
import { useNavigate, useParams, useSubmit } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import useHover from "~/libs/hooks/useHover";

interface LeftSidebarContentItemProps {
  item: FetchRespSchema.PostDetailResp;
  type?: "draft" | "published" | "deleted";
}

export default function LeftSidebarContentItem({
  item,
  type = "draft",
}: LeftSidebarContentItemProps) {
  const $ele = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const { postId } = useParams();

  const onClick = useCallback(() => {
    startTransition(() => {
      navigate(PAGE_ENDPOINTS.WRITE.ID(item.id));
    });
  }, [navigate, item]);

  const isHovering = useHover($ele);

  return (
    <div className={styles.root} ref={$ele}>
      <button
        type="button"
        disabled={isPending}
        className={cn(
          styles.content,
          postId && postId === item.id.toString()
            ? styles.content_active
            : undefined
        )}
        onClick={onClick}
      >
        <div className="col-span-1">
          <svg className={styles.item_icon} fill="none" viewBox="0 0 18 18">
            <path
              d="M10.5 1.875V4.2c0 .63 0 .945.123 1.186.107.211.28.384.491.491C11.354 6 11.67 6 12.3 6h2.325M6.75 9h4.5m-4.5 3h3M15 6.244V12.9c0 1.26 0 1.89-.245 2.371-.216.424-.56.768-.984.984-.48.245-1.11.245-2.371.245H6.6c-1.26 0-1.89 0-2.371-.245a2.25 2.25 0 0 1-.984-.983C3 14.79 3 14.16 3 12.9V5.1c0-1.26 0-1.89.245-2.371a2.25 2.25 0 0 1 .984-.984C4.709 1.5 5.339 1.5 6.6 1.5h3.656c.367 0 .55 0 .723.041.153.037.3.098.433.18.152.093.281.223.54.482l2.345 2.344c.26.26.39.39.482.54.082.135.143.281.18.434.041.173.041.356.041.723Z"
              stroke="stroke-current"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
        <div className={styles.content_text}>{item.title}</div>
      </button>
      <LeftSidebarContentItem.Menu
        item={item}
        isHovering={isHovering}
        type={type}
      />
    </div>
  );
}

interface MenuProps {
  isHovering: boolean;
  item: FetchRespSchema.PostDetailResp;
  type?: "draft" | "published" | "deleted";
}

LeftSidebarContentItem.Menu = React.memo(function Item({
  item,
  isHovering,
  type,
}: MenuProps) {
  const [open, setOpen] = useState(false);

  const submit = useSubmit();

  const onClickRemove = useCallback(() => {
    const isConfirm = confirm("Are you sure you want to delete this draft?");
    if (!isConfirm) return;
    const formData = new FormData();
    formData.append("id", item.id.toString());
    submit(formData, {
      method: "DELETE",
      replace: true,
      encType: "multipart/form-data",
    });
    setOpen(false);
  }, [submit, item]);

  const onClickRestore = useCallback(() => {
    const isConfirm = confirm("Are you sure you want to restore this article?");
    if (!isConfirm) return;
    const formData = new FormData();
    formData.append("id", item.id.toString());
    submit(formData, {
      method: "PUT",
      replace: true,
      encType: "multipart/form-data",
    });
    setOpen(false);
  }, [item, submit]);

  if (!open && !isHovering) return null;

  return (
    <div className={cn(styles.menu)}>
      <div className={styles.menu_content}>
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
            <button className={styles.btn_menu} aria-label="Open menu">
              <svg className={styles.menu_icon} fill="none" viewBox="0 0 4 16">
                <path
                  d="M2 8.834a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667ZM2 14.667A.833.833 0 1 0 2 13a.833.833 0 0 0 0 1.667ZM2 3a.833.833 0 1 0 0-1.666A.833.833 0 0 0 2 3Z"
                  stroke="stroke-outline"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className={styles.popover} sideOffset={5}>
              {type === "draft" || type === "published" ? (
                <button
                  type="button"
                  className={styles.popover_item}
                  onClick={onClickRemove}
                >
                  <svg
                    className={styles.popover_icon}
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      d="m3 3.75.484 8.232c.094 1.59.14 2.385.48 2.989a3 3 0 0 0 1.3 1.226c.622.303 1.419.303 3.012.303h1.448c1.593 0 2.39 0 3.012-.303a3 3 0 0 0 1.3-1.226c.34-.604.386-1.399.48-2.99L15 3.75m-12 0H1.5m1.5 0h12m0 0h1.5m-4.5 0-.203-.609c-.197-.59-.295-.885-.478-1.103a1.5 1.5 0 0 0-.601-.434C10.453 1.5 10.142 1.5 9.52 1.5H8.48c-.622 0-.933 0-1.198.104a1.5 1.5 0 0 0-.602.434c-.182.218-.28.513-.477 1.103L6 3.75M7.5 7.5v5.25m3-5.25v5.25"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>Delete</span>
                </button>
              ) : null}
              {type === "deleted" ? (
                <button
                  type="button"
                  className={styles.popover_item}
                  onClick={onClickRestore}
                >
                  <svg
                    className={styles.popover_icon}
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      d="m3 3.75.484 8.232c.094 1.59.14 2.385.48 2.989a3 3 0 0 0 1.3 1.226c.622.303 1.419.303 3.012.303h1.448c1.593 0 2.39 0 3.012-.303a3 3 0 0 0 1.3-1.226c.34-.604.386-1.399.48-2.99L15 3.75m-12 0H1.5m1.5 0h12m0 0h1.5m-4.5 0-.203-.609c-.197-.59-.295-.885-.478-1.103a1.5 1.5 0 0 0-.601-.434C10.453 1.5 10.142 1.5 9.52 1.5H8.48c-.622 0-.933 0-1.198.104a1.5 1.5 0 0 0-.602.434c-.182.218-.28.513-.477 1.103L6 3.75M7.5 7.5v5.25m3-5.25v5.25"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>restore</span>
                </button>
              ) : null}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
});

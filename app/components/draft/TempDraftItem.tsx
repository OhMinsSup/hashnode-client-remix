import React, { useCallback, useMemo } from "react";
import classNames from "classnames";
import { Icons } from "~/components/shared/Icons";
import { isEmpty, isString } from "~/utils/assertion";

// hooks
import { useFormContext } from "react-hook-form";
import { useFetcher, useParams } from "@remix-run/react";
import { useDraftContext } from "~/context/useDraftContext";

// types
import type { DraftDetailRespSchema } from "~/api/schema/resp";
import { defaultValues, type FormFieldValues } from "~/routes/_draft";

interface TempDraftItemProps {
  item: DraftDetailRespSchema;
}

export default function TempDraftItem({ item }: TempDraftItemProps) {
  const fetcher = useFetcher();
  const { reset } = useFormContext<FormFieldValues>();
  const { toggleSubTitle, $editorJS } = useDraftContext();
  const params = useParams<{ itemId: string }>();

  const selected = useMemo(() => {
    if (!params.itemId) return false;
    return params.itemId.toString() === item.id.toString();
  }, [item.id, params.itemId]);

  const onSelectedDraft = useCallback(async () => {
    if (!item.id) return;
    const json = JSON.parse(item.json ?? "{}");
    if (!isEmpty(json)) {
      reset({
        ...defaultValues,
        ...json,
      });
      if (json.subTitle) {
        toggleSubTitle(true);
      }
      if (json.content && isString(json.content)) {
        const data = JSON.parse(json.content);
        if (!data) return;
        $editorJS?.render(data);
      }
    }
  }, [$editorJS, item.id, item.json, reset, toggleSubTitle]);

  const onClickDelete = useCallback(async () => {
    const isConfim = confirm(
      "정말로 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다."
    );
    if (!isConfim) return;
    const input = {
      id: item.id.toString(),
    };
    fetcher.submit(input, {
      method: "DELETE",
      replace: true,
    });
  }, [fetcher, item.id]);

  return (
    <div
      aria-selected={selected}
      aria-label="write draft item"
      className={classNames("my-draft-item", {
        active: selected,
      })}
    >
      <button
        className={classNames("my-draft-content w-full", {
          active: selected,
        })}
        aria-label="write draft item"
        onClick={onSelectedDraft}
      >
        <div className="icon-wrapper">
          <Icons.EmptyFile className="icon__sm mr-2 flex-shrink-0 stroke-current" />
        </div>
        <div className="text">{item.title || "Untitled"}</div>
      </button>
      <div className="my-draft-more">
        <div className="my-draft-more--container">
          <button
            type="button"
            className="btn-more"
            aria-label="Customise options"
            onClick={onClickDelete}
          >
            <Icons.EllipsisVertical className="icon__sm stroke-current" />
          </button>
        </div>
      </div>
    </div>
  );
}

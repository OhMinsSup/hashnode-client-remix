import React, { useCallback } from "react";
import styles from "./styles.module.css";
import { useWriteFormContext } from "../../context/form";
import { isInvalidDate } from "~/utils/assertion";

export default function DrawerDate() {
  const { register, watch, setValue } = useWriteFormContext();

  const watchDate = watch("publishingDate");

  const onDateCancel = useCallback(() => {
    setValue("publishingDate", undefined);
  }, [setValue]);

  const view = watchDate && !isInvalidDate(watchDate);

  return (
    <>
      <div className="relative mb-2">
        <input
          placeholder="Type a date and hit enter..."
          type="datetime-local"
          autoComplete="off"
          className={styles.ipt_date}
          {...register("publishingDate", {
            valueAsDate: true,
          })}
        />
      </div>
      {view && (
        <button
          type="button"
          className={styles.btn_date_cancel}
          onClick={onDateCancel}
        >
          Cancel Scheduling
        </button>
      )}
    </>
  );
}

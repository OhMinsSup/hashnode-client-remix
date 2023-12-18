import React, { useCallback } from "react";
import styles from "./styles.module.css";
import { useWriteFormContext } from "../../context/form";
import * as Switch from "@radix-ui/react-switch";
import type { FieldPath } from "react-hook-form";
import type { FormFieldValues } from "~/services/validate/post-create-api.validate";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type Props = {
  id: string;
  name: FieldPath<FormFieldValues>;
  label: string;
  title: string;
  description?: string;
};

type DrawerCheckboxProps = Omit<
  InputProps,
  "name" | "className" | "onChange" | "onBlur" | "ref" | "type"
> &
  Props;

export default function DrawerCheckbox({
  id,
  name,
  label,
  title,
  description,
  ...props
}: DrawerCheckboxProps) {
  const { setValue, watch } = useWriteFormContext();

  const value = watch(name) as boolean | undefined;

  const onCheckedChange = useCallback(
    (checked: boolean) => {
      setValue(name, checked);
    },
    [name, setValue]
  );

  return (
    <label htmlFor={id} className={styles.root}>
      <div className={styles.form_item}>
        <p className={styles.form_item_title}>{title}</p>
        {description && <p className={styles.form_item_desc}>{description}</p>}
      </div>
      <Switch.Root
        className={styles.btn_checkbox}
        id={id}
        checked={value}
        onCheckedChange={onCheckedChange}
      >
        <Switch.Thumb className={styles.btn_checkbox_thumb} />
      </Switch.Root>
    </label>
  );
}

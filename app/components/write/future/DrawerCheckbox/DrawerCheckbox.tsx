import React from "react";
import styles from "./styles.module.css";
import { useWriteFormContext } from "../../context/form";
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
  ...props
}: DrawerCheckboxProps) {
  const { register } = useWriteFormContext();

  return (
    <div>
      <div>
        <label htmlFor={id} className={styles.ipt_label}>
          <input
            type="checkbox"
            id={id}
            className={styles.ipt_checkbox}
            {...props}
            {...register(name)}
          />
          <span>{label}</span>
        </label>
      </div>
    </div>
  );
}

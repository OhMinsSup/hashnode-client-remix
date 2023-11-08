import React from "react";
import styles from "./styles.module.css";
import type { FieldPath } from "react-hook-form";
import type { FormFieldValues } from "services/validate/post-create-api.validate";
import { useWriteFormContext } from "../../context/form";

type InputProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

type Props = {
  name: FieldPath<FormFieldValues>;
};

type DrawerTextareaProps = Omit<
  InputProps,
  "name" | "className" | "onChange" | "onBlur" | "ref" | "type"
> &
  Props;

export default function DrawerTextarea({
  name,
  ...props
}: DrawerTextareaProps) {
  const { register } = useWriteFormContext();

  return (
    <textarea className={styles.textarea} {...props} {...register(name)} />
  );
}

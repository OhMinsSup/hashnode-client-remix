import { type UseControllerProps, useController } from "react-hook-form";
import { Input } from "~/components/ui/input";
import type { FormFieldValues } from "~/services/validate/post-create-api.validate";

export default function InputText(props: UseControllerProps<FormFieldValues>) {
  const {
    field: { value, ...field },
  } = useController(props);

  return (
    <Input
      className="w-full !h-[50px]"
      maxLength={70}
      placeholder="Enter meta title"
      {...field}
      value={value as unknown as string}
    />
  );
}

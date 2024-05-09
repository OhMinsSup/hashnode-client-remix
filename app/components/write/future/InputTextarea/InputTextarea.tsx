import { type UseControllerProps, useController } from "react-hook-form";
import { Textarea } from "~/components/ui/textarea";
import type { FormFieldValues } from "~/services/validate/post-create-api.validate";

export default function InputTextarea(
  props: UseControllerProps<FormFieldValues>
) {
  const {
    field: { value, ...field },
  } = useController(props);

  return (
    <Textarea
      className="w-full !h-[98px]"
      maxLength={156}
      placeholder="Enter meta description"
      {...field}
      value={value as unknown as string}
    />
  );
}

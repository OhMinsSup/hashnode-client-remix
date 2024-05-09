import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { type UseControllerProps, useController } from "react-hook-form";
import type { FormFieldValues } from "~/services/validate/post-create-api.validate";

interface InputSwitchProps extends UseControllerProps<FormFieldValues> {
  id: string;
  text: string;
  help: string;
}

export default function InputSwitch({
  id,
  text,
  help,
  ...otherProps
}: InputSwitchProps) {
  const {
    field: { value, onChange, ...field },
  } = useController(otherProps);

  return (
    <Label
      htmlFor={id}
      className="flex relative items-center justify-between gap-20 sm:gap-24 text-xl font-semibold"
    >
      <div className="flex flex-col gap-1 flex-[3_1_0%]">
        <p className="leading-7 [&:not(:first-child)]:mt-6">{text}</p>
        <p className="text-base text-muted-foreground">{help}</p>
      </div>
      <Switch
        id={id}
        {...field}
        onCheckedChange={onChange}
        checked={value as unknown as boolean}
      />
    </Label>
  );
}

import type { UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { FormFieldValues } from '~/services/validate/post-create-api.validate';
import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';

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
      className="relative flex items-center justify-between gap-20 text-xl font-semibold sm:gap-24"
    >
      <div className="flex flex-[3_1_0%] flex-col gap-1">
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

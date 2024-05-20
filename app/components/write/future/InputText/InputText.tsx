import type { UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { FormFieldValues } from '~/services/validate/post-create-api.validate';
import { Input } from '~/components/ui/input';

export default function InputText(props: UseControllerProps<FormFieldValues>) {
  const {
    field: { value, ...field },
  } = useController(props);

  return (
    <Input
      className="!h-[50px] w-full"
      maxLength={70}
      placeholder="Enter meta title"
      {...field}
      value={value as unknown as string}
    />
  );
}

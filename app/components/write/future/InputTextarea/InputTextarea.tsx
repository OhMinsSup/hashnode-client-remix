import type { UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { FormFieldValues } from '~/services/validate/post-create-api.validate';
import { Textarea } from '~/components/ui/textarea';

export default function InputTextarea(
  props: UseControllerProps<FormFieldValues>,
) {
  const {
    field: { value, ...field },
  } = useController(props);

  return (
    <Textarea
      className="!h-[98px] w-full"
      maxLength={156}
      placeholder="Enter meta description"
      {...field}
      value={(value || undefined) as unknown as string | undefined}
    />
  );
}

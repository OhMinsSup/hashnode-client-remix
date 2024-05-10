import type { SelectSingleEventHandler } from 'react-day-picker';
import type { UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { FormFieldValues } from '~/services/validate/post-create-api.validate';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { getDateFormat } from '~/libs/date';
import { cn } from '~/services/libs';

export default function InputDate(props: UseControllerProps<FormFieldValues>) {
  const { field } = useController(props);

  const value = field.value as unknown as string;
  const selected = typeof value === 'string' ? new Date(value) : undefined;

  const onChange: SelectSingleEventHandler = (day) => {
    field.onChange(day?.toISOString());
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full pl-3 text-left font-normal',
              !field.value && 'text-muted-foreground',
            )}
          >
            {field.value ? getDateFormat(selected) : <span>Pick a date</span>}
            <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onChange}
            disabled={(date) => date < new Date()}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {selected && (
        <div className="flex w-full items-center justify-end">
          <Button variant="outline" onClick={() => field.onChange(undefined)}>
            <span>Clear date</span>
          </Button>
        </div>
      )}
    </>
  );
}

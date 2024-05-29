import { useDeferredValue, useEffect, useRef } from 'react';
import isEqual from 'lodash-es/isEqual';

import { useWriteFormContext } from '~/components/write/context/useWriteFormContext';
import { useDebounceFn } from '~/libs/hooks/useDebounceFn';
import { FormFieldValues } from '~/services/validate/post-create-api.validate';

export default function AutoSave() {
  const { watch } = useWriteFormContext();

  const $value = useRef<FormFieldValues | null>(null);

  const deferValue = useDeferredValue(watch());

  const { run } = useDebounceFn(
    async (value: any) => {
      if (isEqual(value, $value.current)) {
        return;
      }

      const result = await Promise.resolve(value);
      console.log(result);

      $value.current = value;
    },
    {
      wait: 1000,
    },
  );

  useEffect(() => {
    run(deferValue);
  }, [deferValue, run]);

  return null;
}

import { useMemo, useRef } from 'react';
import debounce from 'lodash-es/debounce';

import { useUnmount } from './useUnmount';

type noop = (...args: any) => any;

interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export function useDebounceFn<T extends noop>(
  fn: T,
  options?: DebounceOptions,
) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const wait = options?.wait ?? 1000;

  const debounced = useMemo(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...(args as any));
        },
        wait,
        options,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useUnmount(() => {
    debounced.cancel();
  });

  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}

import { useMemo } from "react";
import throttle from "lodash-es/throttle";
import { useLatest } from "./useLatest";
import { useUnmount } from "react-use";

type noop = (...args: any[]) => any;

export interface ThrottleOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

export function useThrottleFn<T extends noop>(
  fn: T,
  options?: ThrottleOptions
) {
  const fnRef = useLatest(fn);

  const wait = options?.wait ?? 1000;

  const throttled = useMemo(
    () =>
      throttle(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        options
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useUnmount(() => {
    throttled.cancel();
  });

  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush,
  };
}

import { useMemo, useState } from 'react';

export interface Actions<T> {
  setLeft: () => void;
  setRight: () => void;
  set: (value: T) => void;
  toggle: () => void;
}

// @ts-expect-error reverseValue is missing in type
function useToggle<T = boolean>(): [boolean, Actions<T>];

// @ts-expect-error reverseValue is missing in type
function useToggle<T>(defaultValue: T): [T, Actions<T>];

// @ts-expect-error reverseValue is missing in type
function useToggle<T, U>(
  defaultValue: T,
  reverseValue: U,
): [T | U, Actions<T | U>];

export function useToggle<D, R>(
  defaultValue: D = false as unknown as D,
  reverseValue?: R,
) {
  const [state, setState] = useState<D | R>(defaultValue);

  const actions = useMemo(() => {
    const reverseValueOrigin = (
      reverseValue === undefined ? !defaultValue : reverseValue
    ) as D | R;

    const toggle = () =>
      setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue));
    const set = (value: D | R) => setState(value);
    const setLeft = () => setState(defaultValue);
    const setRight = () => setState(reverseValueOrigin);

    return {
      toggle,
      set,
      setLeft,
      setRight,
    };
    // useToggle ignore value change
    // }, [defaultValue, reverseValue]);
  }, []);

  return [state, actions];
}

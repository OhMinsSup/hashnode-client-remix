import { useCallback, useRef, useState } from "react";
import { useUnmount } from "react-use";
import type { Dispatch, SetStateAction } from "react";

function useRafState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];
function useRafState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>
];

function useRafState<S>(initialState?: S | (() => S)) {
  const ref = useRef(0);
  const [state, setState] = useState(initialState);

  const setRafState = useCallback((value: S | ((prevState: S) => S)) => {
    cancelAnimationFrame(ref.current);

    ref.current = requestAnimationFrame(() => {
      // @ts-ignore
      setState(value);
    });
  }, []);

  useUnmount(() => {
    cancelAnimationFrame(ref.current);
  });

  return [state, setRafState] as const;
}

export default useRafState;

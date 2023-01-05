import { useCallback, useRef } from "react";

export const useSnapShot = <T extends Record<string, any>>() => {
  const ref = useRef<T>();

  const setSnapShot = useCallback((value: T) => {
    ref.current = value;
  }, []);

  const getSnapShot = useCallback(() => {
    return ref.current;
  }, []);

  return {
    setSnapShot,
    getSnapShot,
  };
};

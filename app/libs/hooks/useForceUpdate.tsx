import { useCallback, useEffect, useRef, useState } from 'react';

export const useForceUpdate = () => {
  const unloadingRef = useRef(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    return () => {
      unloadingRef.current = true;
    };
  }, []);

  return useCallback(() => {
    if (!unloadingRef.current) {
      setCount(count + 1);
    }
  }, [count]);
};

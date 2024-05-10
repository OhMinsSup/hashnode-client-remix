import type { BasicTarget } from '../browser-utils';
import { useBoolean } from './useBoolean';
import { useEventListener } from './useEventListener';

export interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (isHovering: boolean) => void;
}

export function useHover(target: BasicTarget, options?: Options) {
  const { onEnter, onLeave, onChange } = options || {};

  const [state, { setTrue, setFalse }] = useBoolean(false);

  useEventListener(
    'mouseenter',
    () => {
      onEnter?.();
      setTrue();
      onChange?.(true);
    },
    {
      target,
    },
  );

  useEventListener(
    'mouseleave',
    () => {
      onLeave?.();
      setFalse();
      onChange?.(false);
    },
    {
      target,
    },
  );

  return state;
}

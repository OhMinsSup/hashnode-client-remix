import ResizeObserver from "resize-observer-polyfill";
import { useRafState } from "react-use";
import { useIsomorphicLayoutEffectWithTarget } from "../react-utils/createEffectWithTarget";
import { type BasicTarget, getTargetElement } from "../browser-utils";

type Size = { width: number; height: number };

export function useResizeObserver(target: BasicTarget): Size | undefined {
  const [size, setSize] = useRafState<Size>({ width: 0, height: 0 });

  useIsomorphicLayoutEffectWithTarget(
    () => {
      const el = getTargetElement(target);

      if (!el) {
        return;
      }

      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { clientWidth, clientHeight } = entry.target;
          setSize({
            width: clientWidth,
            height: clientHeight,
          });
        });
      });

      resizeObserver.observe(el);
      return () => {
        resizeObserver.disconnect();
      };
    },
    [],
    target
  );

  return size;
}

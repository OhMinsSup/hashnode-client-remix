import ResizeObserver from "resize-observer-polyfill";
import { type BasicTarget, getTargetElement } from "../browser-utils";
import { useIsomorphicLayoutEffectWithTarget } from "../react-utils/createEffectWithTarget";
import useRafState from "./useRafState";

type Size = { width: number; height: number };

export function useSize(target: BasicTarget): Size | undefined {
  const [state, setState] = useRafState<Size>();

  useIsomorphicLayoutEffectWithTarget(
    () => {
      const el = getTargetElement(target);

      if (!el) {
        return;
      }

      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { clientWidth, clientHeight } = entry.target;
          setState({
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

  return state;
}

import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import noop from 'lodash-es/noop';

import { getOwnerDocument } from '../browser-utils/dom';
import { useMemoizedFn } from './useMemoizedFn';

export interface UseOutsideClickProps {
  enabled?: boolean; // hook 활성화 여부
  ref: RefObject<HTMLElement>; // DOM 요소에 대한 참조
  handler?: (e: Event) => void; // 참조된 요소 외부에서 클릭이 트리거될 때 호출되는 함수입니다.
}

export function useOutsideClick(props: UseOutsideClickProps) {
  const { ref, handler = noop, enabled = true } = props;
  const savedHandler = useMemoizedFn(handler);

  const stateRef = useRef({
    isPointerDown: false,
    ignoreEmulatedMouseEvents: false,
  });

  const state = stateRef.current;

  useEffect(() => {
    if (!enabled) return;
    const onPointerDown: any = (e: PointerEvent) => {
      if (isValidEvent(e, ref)) {
        state.isPointerDown = true;
      }
    };

    const onMouseUp: any = (event: MouseEvent) => {
      if (state.ignoreEmulatedMouseEvents) {
        state.ignoreEmulatedMouseEvents = false;
        return;
      }

      if (state.isPointerDown && isValidEvent(event, ref)) {
        state.isPointerDown = false;
        savedHandler(event);
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      state.ignoreEmulatedMouseEvents = true;
      if (state.isPointerDown && isValidEvent(event, ref)) {
        state.isPointerDown = false;
        savedHandler(event);
      }
    };

    const doc = getOwnerDocument(ref.current);
    doc.addEventListener('mousedown', onPointerDown, true);
    doc.addEventListener('mouseup', onMouseUp, true);
    doc.addEventListener('touchstart', onPointerDown, true);
    doc.addEventListener('touchend', onTouchEnd, true);

    return () => {
      doc.removeEventListener('mousedown', onPointerDown, true);
      doc.removeEventListener('mouseup', onMouseUp, true);
      doc.removeEventListener('touchstart', onPointerDown, true);
      doc.removeEventListener('touchend', onTouchEnd, true);
    };
  }, [handler, ref, savedHandler, state, enabled]);
}

function isValidEvent(event: any, ref: React.RefObject<HTMLElement>) {
  const target = event.target as HTMLElement;
  if (event.button > 0) return false;
  // 이벤트 대상이 더 이상 dom에 없는 경우
  if (target) {
    const doc = getOwnerDocument(target);
    if (!doc.body.contains(target)) return false;
  }

  return !ref.current?.contains(target);
}

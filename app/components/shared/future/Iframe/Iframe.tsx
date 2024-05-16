import { useRef } from 'react';

import { useIframe } from './useIframe';

export default function Iframe() {
  const $ele = useRef<HTMLIFrameElement>(null);

  const { status } = useIframe({
    ref: $ele,
  });

  console.log('Iframe status:', status);

  return <iframe title="title" ref={$ele} className="size-full" />;
}

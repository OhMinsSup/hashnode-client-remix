import { useRef } from 'react';

import { useIframe } from './useIframe';

interface IframeProps {
  iframeUrl: string;
}

export default function Iframe({ iframeUrl }: IframeProps) {
  const $ele = useRef<HTMLIFrameElement>(null);

  const { status } = useIframe({
    ref: $ele,
    options: {
      iframeUrl,
    },
  });

  console.log('Iframe status:', status);

  return <iframe title="title" ref={$ele} className="size-full" />;
}

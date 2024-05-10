import { useState } from 'react';

import { isBrowser } from '../browser-utils/dom';

export function useIsHydrating(queryString: string) {
  const isServerRender = !isBrowser;

  const [isHydrating] = useState(
    () => !isServerRender && Boolean(document.querySelector(queryString)),
  );
  return isHydrating;
}

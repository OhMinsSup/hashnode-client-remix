import { useEffect } from 'react';

import { createDeepCompareEffect } from '../react-utils/createDeepCompareEffect';

const useDeepCompareEffect = createDeepCompareEffect(useEffect);

export { useDeepCompareEffect };

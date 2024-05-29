import { useEffect } from 'react';

import { ClientOnly } from '~/components/shared/future/ClientOnly';
import { useEventListener } from '~/libs/hooks/useEventListener';
import { optimizeAnimation } from '~/services/libs';
import { setCookie } from '~/services/store/env-layout-cookie';
import { useEnvStore } from '~/services/store/env-store-provider';

export default function LayoutSizeMeasuringMachine() {
  return (
    <ClientOnly>
      <LayoutSizeMeasuringMachine.Internal />
    </ClientOnly>
  );
}

LayoutSizeMeasuringMachine.Internal = function Item() {
  const setLayout = useEnvStore((state) => state.setLayout);

  const layoutState = useEnvStore((state) => state.layout);

  useEventListener(
    'resize',
    optimizeAnimation(() => {
      setLayout(window.innerWidth);
    }),
  );

  useEffect(() => {
    setLayout(window.innerWidth);
  }, [setLayout]);

  useEffect(() => {
    setCookie('hashnode.layout-width', layoutState.toString());
  }, [layoutState]);

  return null;
};

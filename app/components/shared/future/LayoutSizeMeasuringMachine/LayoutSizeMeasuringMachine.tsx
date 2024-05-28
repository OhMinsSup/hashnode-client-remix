import { useEffect } from 'react';
import { useLoaderData } from '@remix-run/react';

import { ClientOnly } from '~/components/shared/future/ClientOnly';
import { useEventListener } from '~/libs/hooks/useEventListener';
import { optimizeAnimation } from '~/services/libs';
import { setCookie } from '~/services/libs/cookie';

export default function LayoutSizeMeasuringMachine() {
  const data = useLoaderData<any>();
  console.log(data);
  return (
    <ClientOnly>
      <LayoutSizeMeasuringMachine.Internal />
    </ClientOnly>
  );
}

LayoutSizeMeasuringMachine.Internal = function Item() {
  useEventListener(
    'resize',
    optimizeAnimation(() => {
      const width = window.innerWidth;
      setCookie('hashnode.layout.width', window.innerWidth.toString());
      console.log('resize', width);
    }),
  );

  useEffect(() => {
    console.log('mount', window.innerWidth);
    setCookie('hashnode.layout.width', window.innerWidth.toString());
  }, []);

  return null;
};

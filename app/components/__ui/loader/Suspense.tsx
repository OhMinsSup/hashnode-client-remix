import {
  useState,
  useEffect,
  Suspense as ReactSuspense,
  type ComponentProps,
} from 'react';

function Suspense({
  fallback,
  children,
}: ComponentProps<typeof ReactSuspense>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return <ReactSuspense fallback={fallback}>{children}</ReactSuspense>;
  }
  return <>{fallback}</>;
}

export default Suspense;

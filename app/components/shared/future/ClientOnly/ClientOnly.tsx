import React from "react";
import { useHydrated } from "~/libs/hooks/useHydrated";

interface ClientOnlyProps {
  children(): React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ClientOnly({
  children,
  fallback = null,
}: ClientOnlyProps) {
  return useHydrated() ? <>{children()}</> : <>{fallback}</>;
}

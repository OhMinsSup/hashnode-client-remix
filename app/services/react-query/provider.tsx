import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import useQueryClient from '~/services/react-query/client';

interface ClientQueryProviderProps {
  children: React.ReactNode;
}

export default function ClientQueryProvider({
  children,
}: ClientQueryProviderProps) {
  const { queryClient } = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

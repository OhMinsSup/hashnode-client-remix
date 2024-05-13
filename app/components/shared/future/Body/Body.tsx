import React from 'react';

interface BodyProps {
  children: React.ReactNode;
}

export default function Body({ children }: BodyProps) {
  return (
    <body className="bg-white leading-[1.5] dark:bg-slate-950">{children}</body>
  );
}

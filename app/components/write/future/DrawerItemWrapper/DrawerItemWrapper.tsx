import React from 'react';

interface DrawerItemWrapperProps {
  children: React.ReactNode;
}

export default function DrawerItemWrapper({
  children,
}: DrawerItemWrapperProps) {
  return <div className="flex flex-col gap-8">{children}</div>;
}

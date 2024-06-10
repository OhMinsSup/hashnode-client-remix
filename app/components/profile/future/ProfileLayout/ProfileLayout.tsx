import React from 'react';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <main className="relative z-40 grid min-h-screen w-full min-w-full gap-8 sm:max-w-[640px] md:max-w-[768px] lg:mx-auto lg:min-w-0 lg:max-w-full lg:grid-cols-10 lg:px-20">
      <main
        itemScope
        itemType="https://schema.org/ProfilePage"
        itemProp="mainEntity"
        className="relative z-10 col-span-10 mt-5 min-w-0 rounded-md px-5"
      >
        {children}
      </main>
    </main>
  );
}

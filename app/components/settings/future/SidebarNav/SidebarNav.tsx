import { NavLink } from '@remix-run/react';

import { buttonVariants } from '~/components/ui/button';
import { NAV_CONFIG } from '~/constants/navigation';
import { cn } from '~/services/libs';

export default function SidebarNav() {
  return (
    <nav className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1')}>
      {NAV_CONFIG.settingsSidebar.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={`setting-nav-${item.id}`}
            to={item.href as string}
            end
            className={({ isActive }) => {
              return cn(
                buttonVariants({ variant: 'ghost' }),
                isActive
                  ? 'bg-muted hover:bg-muted'
                  : 'hover:bg-transparent hover:underline',
                'justify-start space-x-4',
              );
            }}
          >
            {Icon && <Icon className="size-4" />}
            <span>{item.title}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

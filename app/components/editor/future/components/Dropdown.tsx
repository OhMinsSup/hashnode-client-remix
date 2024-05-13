import { cn } from '~/services/libs';

interface DropdownCategoryTitleProps {
  children: React.ReactNode;
}

export const DropdownCategoryTitle = ({
  children,
}: DropdownCategoryTitleProps) => {
  return (
    <div className="mb-1 px-1.5 text-[.65rem] font-semibold uppercase text-neutral-500 dark:text-neutral-400">
      {children}
    </div>
  );
};

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
}

export const DropdownButton = ({
  children,
  isActive,
  onClick,
  disabled,
  className,
}: DropdownItemProps) => {
  const buttonClass = cn(
    'flex w-full items-center gap-2 rounded bg-transparent p-1.5 text-left text-sm font-medium text-neutral-500 dark:text-neutral-400',
    !isActive && !disabled,
    'hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-neutral-200',
    isActive &&
      !disabled &&
      'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200',
    disabled && 'cursor-not-allowed text-neutral-400 dark:text-neutral-600',
    className,
  );

  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

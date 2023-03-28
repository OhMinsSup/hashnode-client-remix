import React, { useCallback, useTransition } from "react";

interface TabTrendingPostButtonProps {
  id: string;
  currentDuration: number;
  duration: number;
  label: string;
  onTabClick: (duration: number) => void;
}

function TabTrendingPostButton({
  id,
  currentDuration,
  duration,
  label,
  onTabClick,
}: TabTrendingPostButtonProps) {
  const [isPending, startTransition] = useTransition();

  const onClick = useCallback(() => {
    startTransition(() => {
      onTabClick(duration);
    });
  }, [duration, onTabClick]);

  if (isPending) {
    return (
      <div
        className="tab-button"
        tabIndex={-1}
        data-key={duration.toString()}
        id={id}
        aria-selected="false"
        role="tab"
      >
        {label}
      </div>
    );
  }

  return (
    <div
      className="tab-button"
      tabIndex={duration === currentDuration ? 0 : -1}
      data-key={duration.toString()}
      id={id}
      aria-selected={duration === currentDuration ? "true" : "false"}
      role="tab"
      onClick={onClick}
    >
      {label}
    </div>
  );
}

export default TabTrendingPostButton;

TabTrendingPostButton.Skeleton = function TabTrendingPostButtonSkeleton() {
  return (
    <div
      className="tab-button animate-pulse"
      tabIndex={-1}
      data-key="0"
      id="tab-0"
      aria-selected="false"
      role="tab"
    >
      <span className="h-4 w-16 rounded-full bg-gray-200" />
    </div>
  );
};

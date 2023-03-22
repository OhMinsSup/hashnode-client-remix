import React, { useCallback, useTransition } from "react";

interface TabTrendingPostButtonProps {
  id: string;
  currentDuration: number;
  duration: number;
  label: string;
  onTabClick: (duration: number) => void;
}

const TabTrendingPostButton: React.FC<TabTrendingPostButtonProps> = ({
  id,
  currentDuration,
  duration,
  label,
  onTabClick,
}) => {
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
};

export default TabTrendingPostButton;

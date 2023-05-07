import React, { useCallback, useState } from "react";

// components
import { Icons } from "~/components/shared/Icons";

export default function HeaderByControlTheme() {
  const [toggle, setToggle] = useState(false);

  const onClick = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  return (
    <button
      type="button"
      title={toggle ? "Toggle light mode" : "Toggle dark mode"}
      aria-label="Toggle theme"
      className="btn__theme"
      onClick={onClick}
    >
      {toggle ? (
        <Icons.Sun className="icon__md stroke-current" />
      ) : (
        <Icons.Moon className="icon__md stroke-current" />
      )}
    </button>
  );
}

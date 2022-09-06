import React, { useImperativeHandle, useRef } from "react";

interface PicsumGridCardProps {
  url: string;
}

const PicsumGridCard: React.ForwardRefRenderFunction<
  HTMLDivElement,
  PicsumGridCardProps
> = (props, ref) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
    ref,
    () => divRef.current
  );

  return (
    <div
      className=" col-span-4 cursor-pointer rounded-lg md:col-span-3"
      ref={divRef}
    >
      <button
        aria-label="Set unsplash cover image"
        className="w-full overflow-hidden rounded-lg border outline-none"
      >
        <div
          data-radix-aspect-ratio-wrapper
          style={{
            position: "relative",
            paddingBottom: "56.25%",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "0px",
            }}
          >
            <img
              src={props.url}
              alt="MacBook Pro, white ceramic mug,and black smartphone on table"
              className="h-full w-full"
            />
          </div>
        </div>
      </button>
    </div>
  );
};

export default React.forwardRef(PicsumGridCard);

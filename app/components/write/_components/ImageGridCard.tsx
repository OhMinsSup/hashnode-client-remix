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
        <div className="relative pb-[56.25%]">
          <div className="absolute inset-0">
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

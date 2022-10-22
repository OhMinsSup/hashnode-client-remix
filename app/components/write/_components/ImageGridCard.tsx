import React, { useCallback, useImperativeHandle, useRef } from "react";
import { useFormContext } from "react-hook-form";

// types
import type { FileSchema } from "~/api/schema/file";

interface PicsumGridCardProps extends Omit<FileSchema, "deletedAt"> {}

const PicsumGridCard: React.ForwardRefRenderFunction<
  HTMLDivElement,
  PicsumGridCardProps
> = (props, ref) => {
  const { children, ...otherProps } = props;
  const divRef = useRef<HTMLDivElement | null>(null);

  const { setValue } = useFormContext();

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
    ref,
    () => divRef.current
  );

  const onClickSelect = useCallback(() => {
    setValue("thumbnail", otherProps, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [otherProps, setValue]);

  return (
    <div
      className=" col-span-4 cursor-pointer rounded-lg md:col-span-3"
      ref={divRef}
    >
      <button
        onClick={onClickSelect}
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

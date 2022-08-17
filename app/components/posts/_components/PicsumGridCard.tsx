import React from "react";

const PicsumGridCard = () => {
  return (
    <div className=" col-span-4 cursor-pointer rounded-lg md:col-span-3">
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
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixid=MnwyNjEwMzZ8MHwxfHNlYXJjaHwxfHxibG9nfGVufDB8MHx8fDE2NjA2Njg4NDY&amp;ixlib=rb-1.2.1&amp;w=200&amp;q=80&amp;fit=crop"
              alt="MacBook Pro, white ceramic mug,and black smartphone on table"
              className="h-full w-full"
            />
          </div>
        </div>
      </button>
    </div>
  );
};

export default PicsumGridCard;

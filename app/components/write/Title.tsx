import React from "react";

const Title = () => {
  return (
    <div style={{ lineHeight: "1.375" }}>
      <textarea
        id="title"
        name="title"
        maxLength={150}
        placeholder="Article title…"
        className="mb-5 mt-2 w-full resize-none appearance-none overflow-hidden bg-transparent px-4 font-sans text-3xl font-extrabold text-gray-900 outline-none md:text-4xl"
        spellCheck="false"
        style={{
          height: "86px !important",
        }}
      ></textarea>
    </div>
  );
};

export default Title;

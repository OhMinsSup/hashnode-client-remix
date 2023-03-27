import React from "react";

interface ImageProps
  extends Omit<
    React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
    "url" | "id"
  > {
  id?: string | number;
  url?: string;
}

const Image: React.FC<ImageProps> = (props) => {
  const { id, url, alt = "default image", ...otherProps } = props;
  return (
    <>
      <img data-id={id} src={url} alt={alt} {...otherProps} />
    </>
  );
};

export default Image;

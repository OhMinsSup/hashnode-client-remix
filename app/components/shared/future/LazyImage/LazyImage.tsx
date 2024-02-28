import { getPath } from "~/routes/api.v1.assets.image";
import ResourceLoader from "~/utils/resource";

type HTMLImageElementProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

interface LazyImageProps extends HTMLImageElementProps {}

export default function LazyImage({ src, ...otherProps }: LazyImageProps) {
  const requestUrl = src ? getPath({ url: src }) : undefined;

  if (src) {
    const resource = ResourceLoader(src, () => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          resolve(src);
        };
        img.onerror = () => {
          resolve(src);
        };
        img.src = src;
      });
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    resource.load();
    resource.read();
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  return <img src={requestUrl} {...otherProps} />;
}

LazyImage.Skeleton = function LazyImageSkeleton() {
  return (
    <div className="w-full h-full bg-gray-200 rounded-xl md:rounded-lg animate-pulse" />
  );
};

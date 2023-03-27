import React from "react";
import { MediaResource } from "~/utils/resource";
import Image from "~/components/shared/Image";
import type { ResourceSchema } from "~/utils/resource";

interface SuspenseImageProps
  extends Omit<
    React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
    "url" | "id"
  > {
  data: Partial<ResourceSchema> | null;
}

const SuspenseImage: React.FC<SuspenseImageProps> = (props) => {
  const { data, ...otherProps } = props;

  if (props.data && props.data.url && props.data.id) {
    // @ts-ignore
    const resource = MediaResource(props.data);

    resource.load();
    resource.read();
  }

  return <Image id={data?.id} src={data?.url} {...otherProps} />;
};

export default SuspenseImage;

import { FC } from "react";
import { Image } from "@chakra-ui/react";

type ImageRendererProps = {
  src: string;
  alt?: string;
};

const ImageRenderer: FC<ImageRendererProps> = ({ src, alt }) => {
  return (
    <Image
      src={src}
      alt={alt}
      fallbackSrc="iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAQAAAD8IX00AAAADklEQVR42mNkAANGFAoAAD8ABLZPixAAAAAASUVORK5CYII="
    />
  );
};

export default ImageRenderer;

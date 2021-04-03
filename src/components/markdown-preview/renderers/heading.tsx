import { FC } from "react";
import { Heading, HeadingProps } from "@chakra-ui/react";

type HeadingRendererProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

const HeadingRenderer: FC<HeadingRendererProps> = ({ level, children }) => {
  const tag = `h${level}` as const;
  const props: HeadingProps = {
    as: tag,
    mb:
      tag === "h1"
        ? 4
        : tag === "h2"
        ? 4
        : tag === "h3"
        ? 4
        : tag === "h4"
        ? 4
        : tag === "h5"
        ? 3
        : 3,
    fontSize:
      tag === "h1"
        ? "4xl"
        : tag === "h2"
        ? "3xl"
        : tag === "h3"
        ? "2xl"
        : tag === "h4"
        ? "xl"
        : tag === "h5"
        ? "lg"
        : "md",
    borderBottomWidth: ["h1", "h2"].includes(tag) && 1,
    borderBottomColor: ["h1", "h2"].includes(tag) && "gray.200",
  };
  return <Heading {...props}>{children}</Heading>;
};

export default HeadingRenderer;

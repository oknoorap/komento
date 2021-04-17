import { FC } from "react";
import { parse } from "himalaya";
import { Box } from "@chakra-ui/react";

import MarkdownPreview from "components/markdown-preview";
import CodeRenderer from "components/markdown-preview/renderers/code";

type HTMLRendererProps = {
  isBlock: boolean;
  node: {
    value: string;
  };
};

type HTMLChildren = {
  type: string;
  content: string;
};

const HTMLRenderer: FC<HTMLRendererProps> = ({ isBlock, node: { value } }) => {
  const [html] = parse(value);
  const { tagName, children, attributes } = html;
  const props = Object.fromEntries(
    attributes.map((item) => [item.key, item.value])
  );

  switch (tagName) {
    case "spoiler":
      return (
        <CodeRenderer
          language="spoiler"
          value={children?.[0]?.content?.trim()}
        />
      );

    case "p":
    case "pre":
      if (tagName === "pre" && props.lang) {
        return (
          <CodeRenderer
            language={props.lang}
            value={children?.[0]?.content?.trim()}
          />
        );
      }

      return (
        <Box
          as={tagName}
          display={isBlock ? "block" : "inline-block"}
          mb="4"
          {...props}
        >
          {children.map(({ content }: HTMLChildren, index) => (
            <MarkdownPreview key={`markdown-${index}`}>
              {content}
            </MarkdownPreview>
          ))}
        </Box>
      );

    default:
      return null;
  }
};

export default HTMLRenderer;

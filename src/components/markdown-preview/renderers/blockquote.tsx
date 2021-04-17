import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { darken } from "polished";

import { useEmbedTheme } from "hooks/use-embed-theme";

const QuoteRenderer: FC = ({ children }) => {
  const { borderColor } = useEmbedTheme();
  return (
    <Box
      as="blockquote"
      px="4"
      py="2"
      borderLeftWidth="5px"
      borderColor={darken(0.1, borderColor)}
      mb="4"
    >
      {(children as JSX.Element[]).map((item) => item.props.children)}
    </Box>
  );
};

export default QuoteRenderer;

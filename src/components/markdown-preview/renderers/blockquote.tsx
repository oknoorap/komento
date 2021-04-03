import { FC, ReactNode } from "react";
import { Box } from "@chakra-ui/react";

const QuoteRenderer: FC = ({ children }) => {
  return (
    <Box
      as="blockquote"
      px="4"
      py="2"
      borderLeftWidth="5px"
      borderColor="gray.400"
      mb="4"
    >
      {(children as JSX.Element[]).map((item) => item.props.children)}
    </Box>
  );
};

export default QuoteRenderer;

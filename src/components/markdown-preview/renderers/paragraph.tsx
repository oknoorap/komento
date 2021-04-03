import { FC } from "react";
import { Text } from "@chakra-ui/react";

const ParagraphRenderer: FC = ({ children, ...props }) => {
  return <Text mb="4">{children}</Text>;
};

export default ParagraphRenderer;

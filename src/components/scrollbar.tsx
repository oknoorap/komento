import { FC } from "react";
import { Box } from "@chakra-ui/react";
import Scrollbar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

type ScrollbarProps = {
  maxHeight?: number;
};

const ScrollbarComponent: FC<ScrollbarProps> = ({
  children,
  maxHeight = 250,
}) => {
  return (
    <Scrollbar style={{ maxHeight: `${maxHeight}px` }}>{children}</Scrollbar>
  );
};

export default ScrollbarComponent;

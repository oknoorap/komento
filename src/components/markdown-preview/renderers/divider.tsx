import { FC } from "react";
import { Divider } from "@chakra-ui/layout";
import { darken } from "polished";

import { useEmbedTheme } from "hooks/use-embed-theme";

const DividerRenderer: FC = () => {
  const { borderColor } = useEmbedTheme();
  return <Divider borderColor={darken(0.15, borderColor)} mb="4" />;
};

export default DividerRenderer;

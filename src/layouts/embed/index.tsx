import { FC } from "react";
import { Box } from "@chakra-ui/react";

import { useEmbedTheme } from "hooks/use-embed-theme";

const EmbedLayout: FC = ({ children }) => {
  const { bgColor, textColor, linkColor } = useEmbedTheme();

  return (
    <Box
      p="2"
      bgColor={bgColor}
      color={textColor}
      sx={{
        a: {
          color: linkColor,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default EmbedLayout;

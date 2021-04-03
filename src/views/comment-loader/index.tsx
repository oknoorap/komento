import { Box, Flex } from "@chakra-ui/react";

import { useIframeMessenger } from "hooks/use-iframe-messenger";

const CommentLoaderView = () => {
  const { isIframeLoaded } = useIframeMessenger();
  if (isIframeLoaded) {
    return null;
  }

  return (
    <Box position="fixed" w="full" h="full" zIndex="999" bgColor="white">
      <Flex alignItems="center" justifyContent="center" h="full">
        Loading...
      </Flex>
    </Box>
  );
};

export default CommentLoaderView;

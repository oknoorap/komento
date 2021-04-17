import { Box, Flex, Icon, Spinner } from "@chakra-ui/react";

import { useEmbedTheme } from "hooks/use-embed-theme";
import { useCommentList } from "hooks/use-comment-list";
import Logo from "assets/svg/logo.svg?sprite";

const CommentLoaderView = () => {
  const { bgColor, linkColor } = useEmbedTheme();
  const { isCommentLoaded } = useCommentList();
  if (isCommentLoaded) {
    return null;
  }

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="full"
      h="full"
      zIndex="999"
      bgColor={bgColor}
    >
      <Flex alignItems="center" justifyContent="center" h="full">
        <Spinner color={linkColor} size="sm" mr="2" />
        <Icon as={Logo} w="125px" h="auto" fill={linkColor} />
      </Flex>
    </Box>
  );
};

export default CommentLoaderView;

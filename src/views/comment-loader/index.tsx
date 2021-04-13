import { Box, Flex, Icon, Spinner } from "@chakra-ui/react";

import { useCommentList } from "hooks/use-comment-list";
import Logo from "assets/svg/logo.svg?sprite";

const CommentLoaderView = () => {
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
      bgColor="white"
    >
      <Flex alignItems="center" justifyContent="center" h="full">
        <Spinner color="cerulean.500" size="sm" mr="2" />
        <Icon as={Logo} w="125px" h="auto" />
      </Flex>
    </Box>
  );
};

export default CommentLoaderView;

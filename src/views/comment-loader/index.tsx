import { Box, Flex } from "@chakra-ui/react";

import { useCommentList } from "hooks/use-comment-list";

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
        Loading...
      </Flex>
    </Box>
  );
};

export default CommentLoaderView;

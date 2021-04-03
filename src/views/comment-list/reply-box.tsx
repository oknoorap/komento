import { FC } from "react";
import { Flex, Box, Divider } from "@chakra-ui/react";

import { CommentBoxProvider } from "hooks/use-comment-box";
import { useCommentItem } from "hooks/use-comment-item";
import CommentBox from "views/comment-box";

const CommentListReplyBoxView: FC = () => {
  const { isReply, cancelReply } = useCommentItem();
  if (!isReply) {
    return null;
  }

  return (
    <Flex mt="2">
      <Box ml="2" mr="5">
        <Divider
          orientation="vertical"
          borderColor="gray.300"
          borderWidth="1px"
          cursor="pointer"
          _hover={{ borderColor: "gray.500" }}
        />
      </Box>
      <Box w="full">
        <CommentBoxProvider>
          <CommentBox withCancelBtn onCancel={cancelReply} />
        </CommentBoxProvider>
      </Box>
    </Flex>
  );
};

export default CommentListReplyBoxView;

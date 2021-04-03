import { FC, useCallback } from "react";
import { Flex, Box, Divider } from "@chakra-ui/react";

import { CommentBoxProvider } from "hooks/use-comment-box";
import { useCommentList } from "hooks/use-comment-list";
import { useCommentItem } from "hooks/use-comment-item";
import CommentBox from "views/comment-box";

const CommentListReplyBoxView: FC = () => {
  const { replyId, setReplyId } = useCommentList();
  const { id, isReply, cancelReply } = useCommentItem();
  const onCancelReply = useCallback(() => {
    setReplyId(null);
    cancelReply();
  }, [cancelReply]);

  if (!isReply || replyId !== id) {
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
          <CommentBox withCancelBtn onCancel={onCancelReply} />
        </CommentBoxProvider>
      </Box>
    </Flex>
  );
};

export default CommentListReplyBoxView;

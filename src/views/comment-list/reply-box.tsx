import { FC } from "react";
import { Flex, Box, Divider } from "@chakra-ui/react";
import { darken } from "polished";

import { useEmbedTheme } from "hooks/use-embed-theme";
import { useCommentBox } from "hooks/use-comment-box";
import { useCommentItem } from "hooks/use-comment-item";
import CommentBox from "views/comment-box";

const CommentListReplyBoxView: FC = () => {
  const { borderColor } = useEmbedTheme();
  const { replyId } = useCommentBox();
  const { id, onCancelReply } = useCommentItem();

  if (replyId !== id) {
    return null;
  }

  return (
    <Flex mt="2">
      <Box ml="2" mr="5">
        <Divider
          orientation="vertical"
          borderWidth="1px"
          cursor="pointer"
          borderColor={borderColor}
          _hover={{ borderColor: darken(0.2, borderColor) }}
        />
      </Box>
      <Box w="full">
        <CommentBox withCancelBtn onCancel={onCancelReply} />
      </Box>
    </Flex>
  );
};

export default CommentListReplyBoxView;

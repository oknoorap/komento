import { FC, useCallback } from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { CgComment as ReplyIcon } from "react-icons/cg";

import { useCommentList } from "hooks/use-comment-list";
import { useCommentItem } from "hooks/use-comment-item";

const CommentListReplyButtonView: FC = () => {
  const { setReplyId } = useCommentList();
  const { id, reply } = useCommentItem();
  const onReply = useCallback(() => {
    setReplyId(id);
    reply();
  }, [reply]);

  return (
    <Flex alignItems="center" role="group">
      <Box
        as="button"
        display="inline-flex"
        alignItems="center"
        bg="none"
        px="2px"
        color="cerulean.500"
        fontSize="xs"
        fontWeight="bold"
        rounded="sm"
        _hover={{ color: "white", bgColor: "cerulean.500" }}
        onClick={onReply}
      >
        <Icon as={ReplyIcon} mr="1" />
        <Box as="span">Reply</Box>
      </Box>
    </Flex>
  );
};

export default CommentListReplyButtonView;

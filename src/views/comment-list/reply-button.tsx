import { FC } from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { CgComment as ReplyIcon } from "react-icons/cg";

import { useCommentItem } from "hooks/use-comment-item";

const CommentListReplyButtonView: FC = () => {
  const { reply } = useCommentItem();
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
        onClick={reply}
      >
        <Icon as={ReplyIcon} mr="1" />
        <Box as="span">Reply</Box>
      </Box>
    </Flex>
  );
};

export default CommentListReplyButtonView;

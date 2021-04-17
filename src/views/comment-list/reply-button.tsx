import { FC } from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { CgComment as ReplyIcon } from "react-icons/cg";
import { invert, darken } from "polished";

import { useEmbedTheme } from "hooks/use-embed-theme";
import { useCommentItem } from "hooks/use-comment-item";

const CommentListReplyButtonView: FC = () => {
  const { buttonColor, textColor } = useEmbedTheme();
  const { onReply, depth } = useCommentItem();
  if (depth > 3) {
    return null;
  }

  return (
    <Flex alignItems="center" role="group" mr="1">
      <Box
        as="button"
        display="inline-flex"
        alignItems="center"
        bg="none"
        px="3px"
        color={buttonColor}
        fontSize="xs"
        fontWeight="bold"
        rounded="sm"
        _hover={{ color: invert(darken(1, textColor)), bgColor: buttonColor }}
        _focus={{ outline: "none" }}
        onClick={onReply}
      >
        <Icon as={ReplyIcon} mr="1" />
        <Box as="span">Reply</Box>
      </Box>
    </Flex>
  );
};

export default CommentListReplyButtonView;

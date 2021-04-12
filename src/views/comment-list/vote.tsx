import { FC, useMemo } from "react";
import { Flex, Box, Icon, IconButton } from "@chakra-ui/react";
import {
  TiArrowUpThick as VoteUpIcon,
  TiArrowDownThick as VoteDownIcon,
} from "react-icons/ti";

import { useCommentItem } from "hooks/use-comment-item";

const CommentListVote: FC = () => {
  const { id, voteCount, upvote, downvote } = useCommentItem();
  const iconButtonProps = {
    size: "xs",
    bg: "none",
    _focus: {
      bg: "none",
    },
    _active: {
      bg: "none",
    },
  };

  return (
    <Flex alignItems="center" mr="1">
      <IconButton
        aria-label="upvote"
        icon={<Icon as={VoteUpIcon} />}
        {...iconButtonProps}
        _hover={{ color: "green.500" }}
        onClick={() => upvote(id)}
      />
      <Box as="span" fontSize="xs" fontWeight="bold">
        {voteCount}
      </Box>
      <IconButton
        aria-label="downvote"
        icon={<Icon as={VoteDownIcon} />}
        {...iconButtonProps}
        _hover={{ color: "red.500" }}
        onClick={() => downvote(id)}
      />
    </Flex>
  );
};

export default CommentListVote;

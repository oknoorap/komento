import { FC } from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";

import { useCommentItem } from "hooks/use-comment-item";
import MarkdownPreview from "components/markdown-preview";

import AuthorDate from "./author-date";
import Vote from "./vote";
import ReplyBox from "./reply-box";
import ReplyButton from "./reply-button";
import Reaction from "./reaction";
import Replies from "./replies";

const CommentListItemView: FC = () => {
  const { body } = useCommentItem();

  return (
    <Flex w="full" _notLast={{ mb: 4 }}>
      <Flex flexDir="column" w="full">
        <Box mb="1">
          <AuthorDate />
        </Box>

        <Box mb="2">
          <MarkdownPreview>{body}</MarkdownPreview>
        </Box>

        <Flex alignItems="center" role="group">
          <Vote />
          <ReplyButton />
          <Reaction />
        </Flex>

        <ReplyBox />
        <Replies />
      </Flex>
    </Flex>
  );
};
export default CommentListItemView;

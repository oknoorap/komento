import { Box, Flex, Divider, Icon } from "@chakra-ui/react";
import { CgComment as EmptyCommentIcon } from "react-icons/cg";

import { CommentBoxProvider } from "hooks/use-comment-box";
import { useCommentList } from "hooks/use-comment-list";
import { CommentItemProvider } from "hooks/use-comment-item";

import CommentListItem from "./item";

const CommentListView = () => {
  const { comments } = useCommentList();
  return (
    <CommentBoxProvider>
      <Box mt="8">
        <Divider mb="4" />
        {!comments.length && (
          <Flex alignItems="center" justifyContent="center" p="8" fontSize="sm">
            <Icon as={EmptyCommentIcon} mr="1" />
            <Box as="span">Be first to comment.</Box>
          </Flex>
        )}
        {comments.length > 0 &&
          comments.map((comment, index) => (
            <CommentItemProvider
              key={comment.id}
              initialState={{ ...comment, index, depth: 0 }}
            >
              <CommentListItem />
            </CommentItemProvider>
          ))}
      </Box>
    </CommentBoxProvider>
  );
};

export default CommentListView;

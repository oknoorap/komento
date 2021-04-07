import { Box, Divider } from "@chakra-ui/react";

import { useCommentList } from "hooks/use-comment-list";
import { CommentItemProvider } from "hooks/use-comment-item";

import CommentListItem from "./item";

const CommentListView = () => {
  const { comments } = useCommentList();
  return (
    <Box mt="8">
      <Divider mb="4" />
      <Box>
        {comments.map((comment, index) => (
          <CommentItemProvider
            key={comment.id}
            initialState={{ ...comment, index }}
          >
            <CommentListItem />
          </CommentItemProvider>
        ))}
      </Box>
    </Box>
  );
};

export default CommentListView;

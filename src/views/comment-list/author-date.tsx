import { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { useCommentItem } from "hooks/use-comment-item";

const CommentListAuthorDate: FC = () => {
  const { author, createdDate } = useCommentItem();
  return (
    <Flex display="inline-flex" alignItems="center">
      <Box
        as="span"
        fontWeight="semibold"
        fontSize="smaller"
        mr="1.5"
        color="gray.700"
        textDecor="underline"
      >
        {author.name}
      </Box>
      <Box as="span" fontSize="xs" color="gray.500">
        {createdDate}
      </Box>
    </Flex>
  );
};

export default CommentListAuthorDate;

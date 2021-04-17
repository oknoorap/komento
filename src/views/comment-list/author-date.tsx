import { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { lighten } from "polished";

import { useEmbedTheme } from "hooks/use-embed-theme";
import { useCommentItem } from "hooks/use-comment-item";

const CommentListAuthorDate: FC = () => {
  const { textColor } = useEmbedTheme();
  const { author, createdDate } = useCommentItem();
  return (
    <Flex display="inline-flex" alignItems="center">
      <Box
        as="span"
        fontWeight="semibold"
        fontSize="smaller"
        mr="1.5"
        color={textColor}
        textDecor="underline"
      >
        {author.name}
      </Box>
      <Box as="span" fontSize="xs" color={lighten(0.15, textColor)}>
        {createdDate}
      </Box>
    </Flex>
  );
};

export default CommentListAuthorDate;

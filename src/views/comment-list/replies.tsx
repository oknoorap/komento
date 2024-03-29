import { FC } from "react";
import { Flex, Box, Divider, Link, Icon } from "@chakra-ui/react";
import { HiPlusCircle as ExpandIcon } from "react-icons/hi";
import { darken } from "polished";

import { CommentItemProvider } from "hooks/use-comment-item";
import { useEmbedTheme } from "hooks/use-embed-theme";
import { useCommentItem } from "hooks/use-comment-item";
import CommentListItem from "./item";

const CommentListRepliesView: FC = () => {
  const {
    replies,
    onToggleCollapse,
    isCollapsed,
    collapseText,
    depth = 0,
  } = useCommentItem();
  const { borderColor } = useEmbedTheme();
  return (
    replies.length > 0 && (
      <Flex mt="2">
        <Box ml="2" mr="5">
          <Divider
            orientation="vertical"
            borderWidth="1px"
            cursor="pointer"
            borderColor={borderColor}
            _hover={{ borderColor: darken(0.2, borderColor) }}
            onClick={onToggleCollapse}
          />
        </Box>

        {isCollapsed && (
          <Link
            href="#"
            fontSize="sm"
            fontWeight="bold"
            color="cerulean.500"
            onClick={onToggleCollapse}
          >
            <Icon as={ExpandIcon} mr="1" w="4" h="auto" />
            <Box as="span">{collapseText}</Box>
          </Link>
        )}

        {!isCollapsed && (
          <Box w="full">
            {replies.map((comment, index) => (
              <CommentItemProvider
                key={comment.id}
                initialState={{ ...comment, index, depth: depth + 1 }}
              >
                <CommentListItem />
              </CommentItemProvider>
            ))}
          </Box>
        )}
      </Flex>
    )
  );
};

export default CommentListRepliesView;

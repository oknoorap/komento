import { FC } from "react";
import { Flex, Box, Divider, Link, Icon } from "@chakra-ui/react";
import { HiPlusCircle as ExpandIcon } from "react-icons/hi";

import { CommentItemProvider } from "hooks/use-comment-item";
import { useCommentItem } from "hooks/use-comment-item";
import CommentListItem from "./item";

const CommentListRepliesView: FC = () => {
  const {
    replies,
    onToggleCollapse,
    isCollapsed,
    collapseText,
  } = useCommentItem();
  return (
    replies.length > 0 && (
      <Flex mt="2">
        <Box ml="2" mr="5">
          <Divider
            orientation="vertical"
            borderColor="gray.300"
            borderWidth="1px"
            cursor="pointer"
            _hover={{ borderColor: "gray.500" }}
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
            {replies.map((item) => (
              <CommentItemProvider key={item.id} initialState={item}>
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

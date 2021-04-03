import { FC } from "react";
import { Flex, Button } from "@chakra-ui/react";

import { useCommentBox } from "hooks/use-comment-box";
import Profile from "./profile";

type CommentBoxSubmitProps = {
  cancelBtn: boolean;
  onCancel: () => void;
};

const CommentBoxSubmitView: FC<CommentBoxSubmitProps> = ({
  cancelBtn,
  onCancel,
}) => {
  const { isWriteTab } = useCommentBox();
  return (
    <Flex px="4" pb="4" alignItems="flex-end" justifyContent="space-between">
      {isWriteTab && <Profile />}

      {cancelBtn && (
        <Button ml="auto" size="sm" mr="1" onClick={onCancel}>
          Cancel
        </Button>
      )}

      <Button ml={!cancelBtn && "auto"} size="sm" colorScheme="cerulean">
        Post comment
      </Button>
    </Flex>
  );
};

export default CommentBoxSubmitView;

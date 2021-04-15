import { FC } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { lighten, darken, invert } from "polished";

import { useEmbedTheme } from "hooks/use-embed-theme";
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
  const { buttonColor, borderColor, textColor } = useEmbedTheme();
  const { isWriteTab, submitComment, isSubmitting } = useCommentBox();
  return (
    <Flex px="4" pb="4" alignItems="flex-end" justifyContent="space-between">
      {isWriteTab && <Profile />}

      {cancelBtn && (
        <Button
          ml="auto"
          size="sm"
          mr="1"
          color={textColor}
          bg="none"
          _hover={{ bg: "none", color: lighten(0.2, textColor) }}
          _focus={{ outline: "none", bg: "none" }}
          _active={{ outline: "none", bg: "none" }}
          onClick={onCancel}
        >
          Cancel
        </Button>
      )}

      <Button
        ml={!cancelBtn && "auto"}
        size="sm"
        color={invert(darken(1, textColor))}
        bgColor={buttonColor}
        onClick={submitComment}
        isLoading={isSubmitting}
        loadingText="Posting..."
        _hover={{ bgColor: darken(0.05, buttonColor) }}
        _disabled={{ bgColor: lighten(0.05, buttonColor) }}
      >
        Post comment
      </Button>
    </Flex>
  );
};

export default CommentBoxSubmitView;

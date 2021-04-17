import { useRef, useEffect } from "react";
import { Textarea } from "@chakra-ui/react";
import { DebounceInput } from "react-debounce-input";
import { lighten } from "polished";

import { useEmbedTheme } from "hooks/use-embed-theme";
import { useCommentBox } from "hooks/use-comment-box";

const CommentBoxEditor = () => {
  const editorRef = useRef<HTMLTextAreaElement>();
  const { borderColor, textColor } = useEmbedTheme();
  const { comment, onTypeComment, isSubmitting } = useCommentBox();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  return (
    <Textarea
      as={DebounceInput}
      //@ts-ignore
      inputRef={(ref) => {
        editorRef.current = ref;
      }}
      // @ts-ignore
      debounceTimeout={300}
      element="textarea"
      placeholder="Type your comment"
      size="sm"
      borderColor={borderColor}
      color={textColor}
      rows={6}
      isDisabled={isSubmitting}
      value={comment}
      _hover={{ borderColor: lighten(0.2, borderColor) }}
      _placeholder={{ color: textColor, opacity: 0.5 }}
      onChange={onTypeComment}
    />
  );
};

export default CommentBoxEditor;

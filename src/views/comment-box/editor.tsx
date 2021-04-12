import { useRef, useEffect } from "react";
import { Textarea } from "@chakra-ui/react";
import { DebounceInput } from "react-debounce-input";

import { useCommentBox } from "hooks/use-comment-box";

const CommentBoxEditor = () => {
  const editorRef = useRef<HTMLTextAreaElement>();
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
      rows={6}
      isDisabled={isSubmitting}
      value={comment}
      onChange={onTypeComment}
    />
  );
};

export default CommentBoxEditor;

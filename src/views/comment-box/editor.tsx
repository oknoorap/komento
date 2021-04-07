import { useRef, useEffect } from "react";
import { Textarea } from "@chakra-ui/react";
import { DebounceInput } from "react-debounce-input";

import { useCommentBox } from "hooks/use-comment-box";

const CommentBoxEditor = () => {
  const editorRef = useRef<HTMLTextAreaElement>();
  const { editor, onTypeComment } = useCommentBox();

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
      value={editor}
      onChange={onTypeComment}
      rows={6}
      placeholder="Type your comment"
      size="sm"
    />
  );
};

export default CommentBoxEditor;

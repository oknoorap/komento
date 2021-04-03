import { useRef, useEffect } from "react";
import { Textarea } from "@chakra-ui/react";

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
      ref={editorRef}
      value={editor}
      onChange={onTypeComment}
      rows={6}
      placeholder="Type your comment"
      size="sm"
    />
  );
};

export default CommentBoxEditor;

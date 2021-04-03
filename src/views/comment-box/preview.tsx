import { useCommentBox } from "hooks/use-comment-box";
import MarkdownPreview from "components/markdown-preview";

const CommentBoxPreview = () => {
  const { preview } = useCommentBox();
  return <MarkdownPreview>{preview}</MarkdownPreview>;
};

export default CommentBoxPreview;

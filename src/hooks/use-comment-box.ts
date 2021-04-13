import { useState, useMemo, useCallback, useEffect } from "react";
import { createContainer } from "unstated-next";
import { v4 as uuid } from "uuid";

import { useIframeMessenger } from "hooks/use-iframe-messenger";
import { useComment, DB_KEY } from "hooks/use-comment";
import { Comment } from "hooks/use-comment-list";

const useCommentBoxHook = () => {
  const { resizeIframe } = useIframeMessenger();
  const { clientIpAddr, dbRef } = useComment();
  const authorId = useMemo(() => {
    const number = parseInt(clientIpAddr?.split(".")?.join("") ?? "0");
    const id = (
      Array(8 - number.toString(16).length + 1).join("0") + number.toString(16)
    )
      .match(/[a-fA-F0-9]{2}/g)
      .reverse()
      .join("");
    return `0x${id}`;
  }, [clientIpAddr]);
  const [authorName, setAuthorName] = useState<string>("Anonymous");
  const [comment, setComment] = useState<string>();
  const [replyId, setReplyId] = useState<string>();
  const [preview, setPreview] = useState<string>();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isSubmitting, setSubmitStatus] = useState<boolean>();
  const isWriteTab = useMemo(() => tabIndex === 0, [tabIndex]);
  const isPreviewTab = useMemo(() => tabIndex === 1, [tabIndex]);
  const isHelpTab = useMemo(() => tabIndex === 2, [tabIndex]);

  const onTypeComment = useCallback((event) => {
    setComment(event.target.value);
  }, []);

  const submitComment = useCallback(async () => {
    if (!dbRef.current) return;
    if (comment.length < 2) return;

    const id = uuid();
    const vote = 0;
    const reaction = [];
    const createdAt = Date.now();
    const replies = [];
    const body = comment;
    const author = {
      id: authorId,
      name: authorName,
    };

    let comments: Comment[] = dbRef.current.get(DB_KEY) || [];
    const newComment = {
      id,
      body,
      author,
      vote,
      createdAt,
      reaction,
      replies,
    };

    if (replyId) {
      const replyMap = (comment: Comment) => {
        if (comment.id === replyId) comment.replies.push(newComment);
        comment.replies = comment.replies.map(replyMap);
        return comment;
      };
      comments = comments.map(replyMap);
    } else {
      comments.push(newComment);
    }

    setSubmitStatus(true);
    await dbRef.current.set(DB_KEY, comments);
    // delete db;
    // await dbRef.current.set(DB_KEY, []);

    if (replyId) setReplyId(null);
    setComment("");
    setSubmitStatus(false);
  }, [comment, replyId, authorId, authorName]);

  const clearComment = useCallback(() => {
    setComment("");
  }, []);

  const changeTab = useCallback(
    (index: number) => {
      setPreview(index > 0 ? comment : "");
      setTabIndex(index);
    },
    [comment]
  );

  useEffect(() => {
    resizeIframe();
  }, [tabIndex]);

  return {
    comment,
    preview,
    tabIndex,
    isWriteTab,
    isPreviewTab,
    isHelpTab,
    changeTab,
    onTypeComment,
    authorId,
    authorName,
    replyId,
    setReplyId,
    setAuthorName,
    submitComment,
    clearComment,
    isSubmitting,
  };
};

const Container = createContainer(useCommentBoxHook);

export const useCommentBox = Container.useContainer;

export const CommentBoxProvider = Container.Provider;

export default Container;

import { useState, useMemo, useCallback, MouseEvent } from "react";
import { createContainer } from "unstated-next";
import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { useIframeMessenger } from "hooks/use-iframe-messenger";
import { Comment } from "hooks/use-comment-list";

const useCommentItemHook = (comment: Comment) => {
  const { resizeIframe } = useIframeMessenger();
  const { createdAt, replies, vote } = comment;

  // Replies functions
  const [isReply, setReplyStatus] = useState(false);
  const reply = useCallback(() => {
    setReplyStatus(true);
    resizeIframe();
  }, []);
  const cancelReply = useCallback(() => {
    setReplyStatus(false);
    resizeIframe();
  }, []);

  const [isCollapsed, setCollapseStatus] = useState(false);
  const collapseText = useMemo(() => {
    const authors = replies.map((item) => item.author.name);
    return `Show ${authors.slice(0, 1).join(", ")} and ${
      authors.length - 1
    } others`;
  }, []);
  const onToggleCollapse = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setCollapseStatus((isCollapse) => !isCollapse);
    resizeIframe();
  }, []);

  // Vote
  const voteCount = useMemo(
    () =>
      Math.abs(vote) > 999
        ? (Math.sign(vote) * Math.round(Math.abs(vote) / 100)) / 10 + "k"
        : Math.sign(vote) * Math.abs(vote),
    [vote]
  );

  // Date
  const date = new Date(createdAt);
  const dateFormat = format(date, "EEE, d LLL yyyy HH:ss aa");
  const createdDateDistance = formatDistanceToNow(date);
  const createdDate = createdDateDistance.includes("month")
    ? dateFormat
    : `${createdDateDistance} ago`;

  return {
    ...comment,
    createdDate,
    isCollapsed,
    collapseText,
    onToggleCollapse,
    voteCount,
    isReply,
    reply,
    cancelReply,
  };
};

const Container = createContainer(useCommentItemHook);

export const useCommentItem = Container.useContainer;

export const CommentItemProvider = Container.Provider;

export default Container;

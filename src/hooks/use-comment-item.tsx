import { useState, useMemo, useCallback, MouseEvent } from "react";
import { createContainer } from "unstated-next";
import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import pluralize from "pluralize";

import { useIframeMessenger } from "hooks/use-iframe-messenger";
import { Comment, EmojiReaction, useCommentList } from "hooks/use-comment-list";
import { useCommentBox } from "hooks/use-comment-box";
import { numUnit } from "utils/number";

const useCommentItemHook = (comment: Comment) => {
  const { resizeIframe } = useIframeMessenger();
  const { setReplyId, clearComment } = useCommentBox();
  const { submitVote, submitReaction } = useCommentList();
  const { id, createdAt, replies, vote, author, reaction } = comment;

  // Replies functions
  const onReply = useCallback(() => {
    clearComment();
    setReplyId(id);
    resizeIframe();
  }, []);

  const onCancelReply = useCallback(() => {
    clearComment();
    setReplyId(null);
    resizeIframe();
  }, []);

  const [isCollapsed, setCollapseStatus] = useState(false);
  const collapseText = useMemo(() => {
    const authors = replies.map((item) => item.author.name);
    const [firstAuthor, ...rest] = authors;
    const hiddenCommentCount = rest.length;
    const hiddenAuthors =
      hiddenCommentCount > 0
        ? ` and ${hiddenCommentCount} other ${pluralize(
            "reply",
            hiddenCommentCount
          )}`
        : "";
    return `Show ${firstAuthor}${hiddenAuthors}`;
  }, []);
  const onToggleCollapse = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setCollapseStatus((isCollapse) => !isCollapse);
    resizeIframe();
  }, []);

  // Reaction
  const addReaction = useCallback(
    async (emoji: EmojiReaction, commentId: string) => {
      await submitReaction(author.id, emoji, commentId);
    },
    [submitReaction]
  );
  const likeCount = reaction.filter((item) => item.emoji === EmojiReaction.Like)
    .length;
  const dislikeCount = reaction.filter(
    (item) => item.emoji === EmojiReaction.Dislike
  ).length;
  const smileCount = reaction.filter(
    (item) => item.emoji === EmojiReaction.Smile
  ).length;
  const angryCount = reaction.filter(
    (item) => item.emoji === EmojiReaction.Angry
  ).length;
  const loveCount = reaction.filter((item) => item.emoji === EmojiReaction.Love)
    .length;
  const joyCount = reaction.filter((item) => item.emoji === EmojiReaction.Joy)
    .length;

  // Vote
  const voteCount = useMemo(() => numUnit(vote), [vote]);
  const upvote = useCallback(
    async (commentId: string) => {
      await submitVote("up", commentId);
    },
    [submitVote]
  );
  const downvote = useCallback(
    async (commentId: string) => {
      await submitVote("down", commentId);
    },
    [submitVote]
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
    onReply,
    onCancelReply,
    upvote,
    downvote,
    addReaction,
    likeCount,
    dislikeCount,
    smileCount,
    angryCount,
    loveCount,
    joyCount,
  };
};

const Container = createContainer(useCommentItemHook);

export const useCommentItem = Container.useContainer;

export const CommentItemProvider = Container.Provider;

export default Container;

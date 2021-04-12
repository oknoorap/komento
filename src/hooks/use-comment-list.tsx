import { useEffect, useState, useMemo, useCallback } from "react";
import { createContainer } from "unstated-next";

import { useComment, DB_KEY } from "hooks/use-comment";
import { useIframeMessenger } from "hooks/use-iframe-messenger";

export enum EmojiReaction {
  Like = ":+1:",
  Dislike = ":-1:",
  Smile = ":smile:",
  Love = ":heart_eyes:",
  Angry = ":rage:",
  Joy = ":joy:",
}

type Reaction = {
  emoji: EmojiReaction;
  author: string;
};

type CommentAuthor = {
  id: string;
  name: string;
};

export type Comment = {
  id: string;
  vote: number;
  index?: number;
  depth?: number;
  author: CommentAuthor;
  body: string;
  createdAt: number;
  reaction: Reaction[];
  replies: Comment[];
};

type Comments = Comment[];

const useCommentListHook = () => {
  const { dbRef, isDBReady } = useComment();
  const { resizeIframe } = useIframeMessenger();
  const [isCommentLoaded, setCommentLoadStatus] = useState<boolean>();
  const [comments, setCommentList] = useState<Comments>([]);
  const [, rerender] = useState(0);

  const submitVote = useCallback(
    async (type: "up" | "down", commentId: string) => {
      if (!dbRef.current) return;
      if (!commentId) return;
      const commentMap = (comment: Comment) => {
        if (comment.id === commentId) {
          switch (type) {
            case "up":
              comment.vote += 1;
              return comment;
            case "down":
              comment.vote -= 1;
              return comment;
          }
        }
        comment.replies = comment.replies.map(commentMap);
        return comment;
      };

      const newComments = comments.map(commentMap);
      await dbRef.current.set(DB_KEY, newComments);
      setCommentList(newComments);
      rerender(Date.now());
    },
    [comments]
  );

  const submitReaction = useCallback(
    async (author: string, emoji: EmojiReaction, commentId: string) => {
      if (!dbRef.current) return;
      if (!author) return;
      if (!emoji) return;
      if (!commentId) return;
      const commentMap = (comment: Comment) => {
        const reactionByCurrentAuthor = comment.reaction
          .filter((item) => item.author === author)
          .map((item) => item.emoji);

        if (
          comment.id === commentId &&
          !reactionByCurrentAuthor.includes(emoji)
        ) {
          comment.reaction.push({
            author,
            emoji,
          });
        }
        comment.replies = comment.replies.map(commentMap);
        return comment;
      };

      const newComments = comments.map(commentMap);
      await dbRef.current.set(DB_KEY, newComments);
      setCommentList(newComments);
      rerender(Date.now());
    },
    [comments]
  );

  useEffect(() => {
    if (!dbRef.current) return;
    if (!isDBReady) return;

    const sortByCreatedAt = (a, z) => z.createdAt - a.createdAt;
    const commentsMap = (item: Comment) => {
      item.replies = item.replies.map(commentsMap).sort(sortByCreatedAt);
      return item;
    };

    dbRef.current.events.on("write", (_, entry) => {
      setCommentList(
        entry.payload.value.sort(sortByCreatedAt).map(commentsMap)
      );
      rerender(() => Date.now());
      resizeIframe();
    });

    const onCommentReady = () => {
      setCommentLoadStatus(true);
      setCommentList(
        (dbRef.current.get(DB_KEY) || []).sort(sortByCreatedAt).map(commentsMap)
      );
      rerender(() => Date.now());
      resizeIframe();
    };

    dbRef.current.events.on("ready", onCommentReady);
    dbRef.current.events.on("peer", onCommentReady);
    dbRef.current.events.on("replicated", onCommentReady);

    dbRef.current.load();
  }, [isDBReady]);

  return {
    comments,
    isCommentLoaded,
    submitVote,
    submitReaction,
  };
};

const Container = createContainer(useCommentListHook);

export const useCommentList = Container.useContainer;

export const CommentListProvider = Container.Provider;

export default Container;

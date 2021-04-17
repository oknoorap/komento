import { useEffect, useState, useMemo, useCallback } from "react";
import { createContainer } from "unstated-next";
import { v4 as uuid } from "uuid";

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
  const { dbRef, isDBReady, isDemo } = useComment();
  const { resizeIframe } = useIframeMessenger();
  const [isCommentLoaded, setCommentLoadStatus] = useState<boolean>();
  const [comments, setCommentList] = useState<Comments>([]);
  const [, rerender] = useState(0);

  const submitVote = useCallback(
    async (type: "up" | "down", commentId: string) => {
      if (!isDemo && !dbRef.current) return;
      if (!commentId) return;
      if (isDemo) return;

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
    [comments, isDemo]
  );

  const submitReaction = useCallback(
    async (author: string, emoji: EmojiReaction, commentId: string) => {
      if (!isDemo && !dbRef.current) return;
      if (!author) return;
      if (!emoji) return;
      if (!commentId) return;
      if (isDemo) return;

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
    [comments, isDemo]
  );

  useEffect(() => {
    if (!isDemo && !dbRef.current) return;
    if (!isDBReady) return;
    if (isDemo) {
      setCommentList([
        {
          id: uuid(),
          author: {
            id: "0x0",
            name: "Anonymous",
          },
          body: "Nice reaction!",
          createdAt: 1618293184378,
          reaction: [
            {
              author: "0x0",
              emoji: EmojiReaction.Love,
            },
            {
              author: "0x0",
              emoji: EmojiReaction.Smile,
            },
          ],
          replies: [
            {
              id: uuid(),
              author: {
                id: "0x0",
                name: "Anonymous",
              },
              body: "Nested Comment, here is link https://komento.host",
              createdAt: 1618299201886,
              reaction: [],
              replies: [
                {
                  id: uuid(),
                  author: {
                    id: "0x0",
                    name: "Anonymous",
                  },
                  body: "Do you like Inception Movie?",
                  createdAt: 1618299372285,
                  reaction: [],
                  replies: [
                    {
                      id: uuid(),
                      author: {
                        id: "0x0",
                        name: "Leonardo",
                      },
                      body: "Yesn't",
                      createdAt: 1618299372285,
                      reaction: [],
                      replies: [],
                      vote: 0,
                    },
                  ],
                  vote: 0,
                },
              ],
              vote: 0,
            },
            {
              id: uuid(),
              author: {
                id: "0x0",
                name: "Anonymous",
              },
              body:
                "I have spoiler: \n```spoiler\nHello world\n```\nYou can open spoiler above.",
              createdAt: 1618299201886,
              reaction: [],
              replies: [],
              vote: 0,
            },
          ],
          vote: 0,
        },
        {
          id: uuid(),
          author: {
            id: "0x0",
            name: "Anonymous",
          },
          body: `I have code\n\`\`\`html\n<!DOCTYPE html>\n <html lang="en">\n <head>\n    <meta charset="UTF-8">\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Komento</title>\n </head>\n <body>\n    <script async data-config="eyJ0aGVtZSI6eyJiZyI6IiNmZmZmZmYiLCJib3JkZXIiOiIjQ0JENUUwIiwidGV4dCI6IiMyRDM3NDgiLCJidXR0b24iOiIjMGZhN2RjIiwibGluayI6IiMwZmE3ZGMifSwicXMiOmZhbHNlLCJoYXNoIjpmYWxzZX0=" src="http://localhost:3000/embed.js"></script>\n </body>\n </html>\n\`\`\``,
          createdAt: 1618293184378,
          reaction: [],
          replies: [],
          vote: 10,
        },
        {
          id: uuid(),
          author: {
            id: "0x0",
            name: "Anonymous",
          },
          body: "Comment with vote",
          createdAt: 1618293184378,
          reaction: [],
          replies: [],
          vote: 3,
        },
        {
          id: uuid(),
          author: {
            id: "0x0",
            name: "Anonymous",
          },
          body: "Hello world",
          createdAt: 1618293111790,
          reaction: [],
          replies: [],
          vote: 0,
        },
      ]);
      setCommentLoadStatus(true);
      return;
    }

    const sortByCreatedAt = (a, z) => z.createdAt - a.createdAt;
    const commentsMap = (item: Comment) => {
      item.replies = item.replies.map(commentsMap).sort(sortByCreatedAt);
      return item;
    };

    dbRef.current.events.on("write", (_, entry) => {
      const commentList = entry.payload.value
        .sort(sortByCreatedAt)
        .map(commentsMap);
      setCommentList(commentList);
      rerender(() => Date.now());
      resizeIframe();
    });

    const onCommentReady = () => {
      const commentList = (dbRef.current.get(DB_KEY) || [])
        .sort(sortByCreatedAt)
        .map(commentsMap);
      setCommentList(commentList);
      rerender(() => Date.now());
      setCommentLoadStatus(true);
      resizeIframe();
    };

    dbRef.current.events.on("ready", onCommentReady);
    dbRef.current.events.on("peer", onCommentReady);
    dbRef.current.events.on("replicated", onCommentReady);
    dbRef.current.load();
  }, [isDBReady, isDemo]);

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

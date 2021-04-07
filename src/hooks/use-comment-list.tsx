import { useEffect, useState, useMemo } from "react";
import { createContainer } from "unstated-next";

import { useComment } from "hooks/use-comment";

type Reaction = {
  emoji: string;
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
  author: CommentAuthor;
  body: string;
  createdAt: number;
  reaction: Reaction[];
  replies: Comment[];
};

type Comments = Comment[];

const useCommentListHook = () => {
  const { clientIpAddr } = useComment();
  const [replyId, setReplyId] = useState<string>();
  const authorId = useMemo(
    () =>
      `0x${
        clientIpAddr
          ?.split(".")
          ?.map((item) => parseInt(item, 16))
          ?.join("") ?? "0"
      }`,
    [clientIpAddr]
  );
  const [authorName, setAuthorName] = useState<string>("Anonymous");
  const [comments, setCommentList] = useState<Comments>([]);

  useEffect(() => {
    setCommentList([
      {
        id: "ab719cd",
        vote: 329923,
        author: {
          id: "josfoiw",
          name: "Josh",
        },
        body: "Hello world **haha**",
        reaction: [],
        createdAt: Date.now(),
        replies: [
          {
            id: "d8bc7e",
            vote: 0,
            author: {
              id: "josfoiw",
              name: "Anonymous",
            },
            body: "You are awesome",
            reaction: [],
            createdAt: Date.now(),
            replies: [],
          },
          {
            id: "iiw9sdf",
            vote: 0,
            author: {
              id: "wojfow",
              name: "Anonymous",
            },
            body:
              "Yeah biggest bottleneck right now is forecasting. Since it takes around 2-3 months between the moment you pull the trigger on a product until it reaches Amazon warehouse, it can be quite tricky to make sure you have enough stock at all time. Especially since you don't want to order too much for any new orders, if you are still unsure if they will sell. For the established SKU's it's a bit easier since I can just order x5 the monthly sales.",
            reaction: [],
            createdAt: Date.now(),
            replies: [],
          },
          {
            id: "c8bc7e",
            vote: 0,
            author: {
              id: "wefw",
              name: "Baba",
            },
            body:
              "## My Explanation\n```spoiler\nthis is a fine comment host\n```",
            reaction: [],
            createdAt: Date.now(),
            replies: [
              {
                id: "b8bc7e",
                vote: 0,
                author: {
                  id: "wefw",
                  name: "Coderz Warrior",
                },
                body:
                  "okay that's fine though, but \n ### This is my codes\n```javascript\nconsole.log('testing');\n```",
                reaction: [],
                createdAt: Date.now(),
                replies: [],
              },
            ],
          },
        ],
      },
      {
        id: "cc719cd",
        vote: 0,
        author: {
          id: "josfoiw",
          name: "Area 2xxs",
        },
        body: "This is second comment",
        reaction: [],
        createdAt: Date.now(),
        replies: [],
      },
    ]);
  }, []);

  return {
    comments,
    replyId,
    setReplyId,
  };
};

const Container = createContainer(useCommentListHook);

export const useCommentList = Container.useContainer;

export const CommentListProvider = Container.Provider;

export default Container;

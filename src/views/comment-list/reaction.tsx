import { useRef, useMemo } from "react";
import {
  Flex,
  Box,
  Icon,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  SimpleGrid,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { BiSmile as ReactionIcon } from "react-icons/bi";
import { Emoji } from "emoji-mart";
import { invert, darken } from "polished";

import "emoji-mart/css/emoji-mart.css";

import { useEmbedTheme } from "hooks/use-embed-theme";
import { useCommentItem } from "hooks/use-comment-item";
import { EmojiReaction } from "hooks/use-comment-list";
import { numUnit } from "utils/number";

const CommentListReaction = () => {
  const ref = useRef<HTMLDivElement>();
  const { bgColor, borderColor, buttonColor, textColor } = useEmbedTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    id,
    likeCount,
    dislikeCount,
    smileCount,
    angryCount,
    loveCount,
    joyCount,
    addReaction,
    reaction,
  } = useCommentItem();
  const emojiList = useMemo(
    () => [
      { emoji: EmojiReaction.Like, count: likeCount },
      { emoji: EmojiReaction.Dislike, count: dislikeCount },
      { emoji: EmojiReaction.Smile, count: smileCount },
      { emoji: EmojiReaction.Love, count: loveCount },
      { emoji: EmojiReaction.Angry, count: angryCount },
      { emoji: EmojiReaction.Joy, count: joyCount },
    ],
    [likeCount, dislikeCount, smileCount, angryCount, loveCount, joyCount]
  );

  useOutsideClick({
    ref,
    handler: onClose,
  });

  return (
    <Flex alignItems="center" position="relative" ref={ref}>
      {emojiList.map(({ emoji, count }, index) => {
        if (!count) {
          return null;
        }

        return (
          <Flex
            key={`emoji-count-${index}`}
            as="button"
            alignItems="center"
            px="1"
            rounded="md"
            borderWidth="1px"
            borderColor={buttonColor}
            _notLast={{ mr: 1 }}
            _focus={{ outline: "none" }}
          >
            <Emoji emoji={`${emoji}:skin-tone-2:`} size={16} />
            <Box as="span" ml="1" fontSize="xs" fontWeight="bold">
              {numUnit(count)}
            </Box>
          </Flex>
        );
      })}

      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
      >
        <PopoverTrigger>
          <Box
            as="button"
            px="3px"
            display="inline-flex"
            alignItems="center"
            fontSize="xs"
            fontWeight="bold"
            rounded="sm"
            color={isOpen ? invert(darken(1, textColor)) : buttonColor}
            bgColor={isOpen ? buttonColor : "transparent"}
            visibility={!isOpen ? "hidden" : null}
            _groupHover={{ visibility: "visible" }}
            _hover={{ color: "white", bgColor: buttonColor }}
            _focus={{ outline: "none" }}
          >
            <Box as="span">+</Box>
            <Icon as={ReactionIcon} />
          </Box>
        </PopoverTrigger>
        <PopoverContent
          w="150px"
          shadow="2xl"
          bgColor={bgColor}
          borderColor={borderColor}
          _focus={{ outline: "none" }}
        >
          <PopoverHeader
            fontSize="xs"
            fontWeight="bold"
            borderColor={borderColor}
          >
            Add Reaction!
          </PopoverHeader>
          <PopoverBody>
            <SimpleGrid columns={3} columnGap="2" rowGap="1">
              {emojiList.map(({ emoji }, index) => {
                const onPickEmoji = async () => {
                  await addReaction(emoji, id);
                  onClose();
                };

                return (
                  <Button
                    key={`emoji-${index}`}
                    size="xs"
                    bg="none"
                    _hover={{ bg: "none" }}
                    onClick={onPickEmoji}
                  >
                    <Emoji emoji={`${emoji}:skin-tone-2:`} size={20} />
                  </Button>
                );
              })}
            </SimpleGrid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default CommentListReaction;

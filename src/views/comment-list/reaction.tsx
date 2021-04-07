import { useRef, useCallback } from "react";
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

import "emoji-mart/css/emoji-mart.css";

import { useCommentItem } from "hooks/use-comment-item";
import { numUnit } from "utils/number";

const emojiList = [
  ":+1:",
  ":-1:",
  ":smile:",
  ":heart_eyes:",
  ":rage:",
  ":joy:",
];

const CommentListReaction = () => {
  const ref = useRef<HTMLDivElement>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const pickEmoji = useCallback(
    (emoji: string) => {
      onClose();
      console.log({ emoji });
    },
    [onClose]
  );

  useOutsideClick({
    ref,
    handler: onClose,
  });

  return (
    <Flex alignItems="center" position="relative" ref={ref}>
      {emojiList.map((emoji, index) => {
        let emojiCount = 0;
        switch (emoji) {
          case ":+1:":
            break;
          case ":-1:":
            break;
          case ":smile:":
            break;
          case ":heart_eyes:":
            break;
          case ":rage:":
            break;
          case ":joy:":
            break;
          default:
            break;
        }

        if (!emojiCount) {
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
            borderColor="cerulean.500"
            _notLast={{ mr: 1 }}
            _focus={{ outline: "none" }}
          >
            <Emoji emoji={`${emoji}:skin-tone-2:`} size={16} />
            <Box as="span" ml="1" fontSize="xs" fontWeight="bold">
              {numUnit(emojiCount)}
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
            color={isOpen ? "white" : "cerulean.500"}
            bgColor={isOpen ? "cerulean.500" : "transparent"}
            visibility={!isOpen ? "hidden" : null}
            _groupHover={{ visibility: "visible" }}
            _hover={{ color: "white", bgColor: "cerulean.500" }}
            _focus={{ outline: "none" }}
          >
            <Box as="span">+</Box>
            <Icon as={ReactionIcon} />
          </Box>
        </PopoverTrigger>
        <PopoverContent w="150px" shadow="2xl" _focus={{ outline: "none" }}>
          <PopoverHeader fontSize="xs" fontWeight="bold">
            Add Reaction!
          </PopoverHeader>
          <PopoverBody>
            <SimpleGrid columns={3} columnGap="2" rowGap="1">
              {emojiList.map((emoji, index) => (
                <Button
                  key={`emoji-${index}`}
                  size="xs"
                  bg="none"
                  _hover={{ bg: "none" }}
                  onClick={() => pickEmoji(emoji)}
                >
                  <Emoji emoji={`${emoji}:skin-tone-2:`} size={20} />
                </Button>
              ))}
            </SimpleGrid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default CommentListReaction;

import { useState, useCallback, useMemo, useRef, KeyboardEvent } from "react";
import { Flex, Box, Icon } from "@chakra-ui/react";
import { BiCheck as CheckIcon, BiEditAlt as EditIcon } from "react-icons/bi";

import { useCommentBox } from "hooks/use-comment-box";

const CommentBoxProfile = () => {
  const { authorName, setAuthorName } = useCommentBox();
  const profileRef = useRef<HTMLDivElement>();
  const [isEdit, setEditableStatus] = useState<boolean>();

  const changeAuthorValue = useCallback(() => {
    if (!profileRef.current) return;
    const value = profileRef.current.textContent.trim();
    if (value.length > 3) {
      setAuthorName(value);
      return;
    }

    setAuthorName("Anonymous");
  }, []);

  const toggleEdit = useCallback(() => {
    if (!profileRef.current) return;
    let timeout;

    if (isEdit) {
      changeAuthorValue();
    } else {
      timeout = setTimeout(() => {
        profileRef.current.focus();
        document.execCommand("selectall");
      }, 0);
    }

    setEditableStatus(() => !isEdit);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isEdit]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!profileRef.current) return;
    if (event.key.toLowerCase() === "enter") {
      event.preventDefault();
      setEditableStatus(false);
      changeAuthorValue();
      return;
    }

    if (profileRef.current.textContent.trim().length > 24) {
      event.preventDefault();
      return;
    }
  }, []);

  return (
    <Flex alignItems="center" fontSize="sm">
      <Box as="span" mr="1">
        Posting as
      </Box>
      <Box fontSize="xs" textDecor="underline" fontWeight="bold" role="group">
        <Box
          as="span"
          ref={profileRef}
          contentEditable={isEdit}
          suppressContentEditableWarning={true}
          onKeyPress={handleKeyPress}
          _focus={{ outline: "none" }}
          sx={{
            b: {
              fontWeight: "normal",
            },
            i: {
              fontStyle: "normal",
            },
            u: {
              textDecor: "none",
            },
          }}
        >
          {authorName}
        </Box>
        <Icon
          as={isEdit ? CheckIcon : EditIcon}
          ml="0.5"
          visibility="hidden"
          onClick={toggleEdit}
          _groupHover={{ visibility: "visible" }}
        />
      </Box>
    </Flex>
  );
};

export default CommentBoxProfile;

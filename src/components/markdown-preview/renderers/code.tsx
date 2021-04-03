import { FC, useEffect, useRef } from "react";
import { Box, Icon, useClipboard } from "@chakra-ui/react";
import { IoMdCopy as CopyIcon } from "react-icons/io";
import { AiOutlineWarning as WarningIcon } from "react-icons/ai";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

import { useIframeMessenger } from "hooks/use-iframe-messenger";
import MarkdownPreview from "components/markdown-preview";
import Scrollbar from "components/scrollbar";

type CodeRendererProps = {
  value: string;
  language?: string;
  isInline?: boolean;
};

export const InlineCodeRenderer: FC<CodeRendererProps> = ({
  isInline = true,
  language,
  value,
}) => {
  const codeRef = useRef<HTMLElement & { align: any }>();
  useEffect(() => {
    if (codeRef.current) {
      (hljs as any).highlightElement(codeRef.current);
    }
  }, []);

  return (
    <Box
      ref={codeRef}
      as="code"
      p={!isInline && 4}
      px={isInline && 2}
      py={isInline && "1px"}
      bgColor={isInline && !language && "gray.200"}
      color={isInline && !language && "red.500"}
      display={isInline ? "inline" : "block"}
      className={`lang-${language || "text"}`}
      fontSize="sm"
    >
      {value}
    </Box>
  );
};

const CodeRenderer: FC<CodeRendererProps> = ({ value, language }) => {
  const detailsRef = useRef<HTMLDetailsElement & { align: any }>();
  const { onCopy } = useClipboard(value);
  const { resizeIframe } = useIframeMessenger();
  const isSpoiler = language === "spoiler";

  useEffect(() => {
    const onToggle = () => {
      resizeIframe();
    };

    if (detailsRef.current)
      detailsRef.current.addEventListener("toggle", onToggle);

    return () => {
      if (detailsRef.current)
        detailsRef.current.removeEventListener("toggle", onToggle);
    };
  }, []);

  return (
    <Box
      as="details"
      ref={detailsRef}
      open={!isSpoiler}
      border="1px"
      borderColor="gray.300"
      role="group"
      position="relative"
      mb="4"
    >
      <Box
        as="summary"
        className="outside"
        fontSize="xs"
        fontWeight="bold"
        textTransform="uppercase"
        cursor="pointer"
        borderBottom="1px"
        borderColor="gray.300"
        py="2"
        px="4"
        _focus={{ outline: "none" }}
      >
        {isSpoiler && <Icon as={WarningIcon} color="yellow.500" mr="1" />}
        {language && (
          <Box as="span" mr="1">
            {language}
          </Box>
        )}
        {isSpoiler && <Icon as={WarningIcon} color="yellow.500" mr="1" />}
        {!isSpoiler && <Box as="span">codes</Box>}
      </Box>
      {!isSpoiler && (
        <Icon
          as={CopyIcon}
          position="absolute"
          top="2"
          right="2"
          cursor="pointer"
          visibility="hidden"
          zIndex="999"
          _groupHover={{ visibility: "visible" }}
          onClick={onCopy}
        />
      )}
      <Scrollbar>
        {!isSpoiler && (
          <Box as="pre" className="outside">
            <InlineCodeRenderer
              language={language || "text"}
              value={value}
              isInline={false}
            />
          </Box>
        )}
        {isSpoiler && (
          <Box p="4" mb="4">
            <MarkdownPreview>{value}</MarkdownPreview>
          </Box>
        )}
      </Scrollbar>
    </Box>
  );
};

export default CodeRenderer;

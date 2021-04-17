import { FC, useEffect, useRef } from "react";
import { Flex, Box, Icon, useClipboard } from "@chakra-ui/react";
import { darken } from "polished";
import { IoMdCopy as CopyIcon } from "react-icons/io";
import { AiOutlineWarning as WarningIcon } from "react-icons/ai";
import hljs from "highlight.js";

import { useEmbedTheme } from "hooks/use-embed-theme";
import { useIframeMessenger } from "hooks/use-iframe-messenger";
import MarkdownPreview from "components/markdown-preview";
import Scrollbar from "components/scrollbar";

import highlighterThemes from "./code-themes";

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
      whiteSpace="pre-wrap"
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
  const { borderColor, textColor, codeHighlighter } = useEmbedTheme();
  const detailsRef = useRef<HTMLDetailsElement & { align: any }>();
  const { onCopy, hasCopied } = useClipboard(value);
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

  // Highlighter Styles
  useEffect(() => {
    if (!highlighterThemes.includes(codeHighlighter)) return;
    let hljs: HTMLLinkElement = document.querySelector("link#hljs-css");
    if (hljs) hljs.remove();

    hljs = document.createElement("link");
    hljs.rel = "stylesheet";
    hljs.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/${codeHighlighter}.min.css`;

    const head = document.head || document.getElementsByTagName("head")[0];
    head.appendChild(hljs);
  }, [codeHighlighter]);

  return (
    <Box
      as="details"
      role="group"
      ref={detailsRef}
      open={!isSpoiler}
      border="1px"
      borderColor={borderColor}
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
        borderColor={borderColor}
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
        <Flex
          alignItems="center"
          position="absolute"
          top="2"
          right="2"
          cursor="pointer"
          zIndex="999"
          color={hasCopied ? darken(0.3, textColor) : darken(0.2, textColor)}
          visibility="hidden"
          _groupHover={{ visibility: "visible" }}
          onClick={onCopy}
        >
          <Box
            as="span"
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            mr="0.5"
          >
            {hasCopied ? "Copied" : "Copy"}
          </Box>
          <Icon as={CopyIcon} />
        </Flex>
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

import { useMemo } from "react";
import { Box, Flex, Icon, useClipboard } from "@chakra-ui/react";
import { IoMdCopy as CopyIcon } from "react-icons/io";
import stringifyObj from "stringify-object";

import { useSetup } from "hooks/use-setup";

const SetupCodeView = () => {
  const { dataConfig } = useSetup();
  const scriptSrc = useMemo(
    () =>
      `<script async data-config="${stringifyObj(dataConfig).replace(
        /[\n\t]/g,
        ""
      )}" src="${process.env.NEXT_PUBLIC_WEBSITE_URL}/embed.js" />`,
    [dataConfig]
  );
  const { hasCopied, onCopy } = useClipboard(scriptSrc);
  return (
    <Box role="group" position="relative">
      <Box
        as="pre"
        p="4"
        mt="4"
        mb="10"
        bgColor="gray.50"
        color="red.500"
        borderWidth="1px"
        borderColor="gray.500"
        rounded="md"
        whiteSpace="pre-wrap"
        userSelect="all"
      >
        {scriptSrc}
      </Box>
      <Flex
        display="inline-flex"
        alignItems="center"
        visibility="hidden"
        position="absolute"
        top="2"
        right="2"
        fontSize="xs"
        cursor="pointer"
        _groupHover={{ visibility: "visible" }}
        onClick={onCopy}
      >
        <Box as="span" textTransform="uppercase" mr="0.5">
          {hasCopied ? "Copied" : "Copy"}
        </Box>
        <Icon as={CopyIcon} color="gray.500" w="4" h="auto" />
      </Flex>
    </Box>
  );
};

export default SetupCodeView;

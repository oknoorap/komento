import { Flex, Box } from "@chakra-ui/react";

const CommentBoxProfile = () => {
  return (
    <Flex alignItems="center" fontSize="sm">
      <Box as="span" mr="1">
        Posting as
      </Box>
      <Box as="span" textDecor="underline" fontWeight="bold">
        profile
      </Box>
    </Flex>
  );
};

export default CommentBoxProfile;

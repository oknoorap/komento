import { Flex, Box, Icon, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import { description } from "../../../next-seo.config";
import Logo from "assets/svg/logo.svg?sprite";

const HeaderLayout = () => {
  return (
    <Flex flexDir="column" alignItems="center" mb="10">
      <NextLink href="/" passHref>
        <Link w="60%" _focus={{ outline: "none" }}>
          <Icon as={Logo} w="100%" h="auto" />
        </Link>
      </NextLink>
      <Box color="gray.600" mt="-5">
        {description}
      </Box>
    </Flex>
  );
};

export default HeaderLayout;

import { Flex, Box, Icon } from "@chakra-ui/react";

import { description } from "../../../next-seo.config";
import Logo from "assets/svg/logo.svg?sprite";

const HeaderLayout = () => {
  return (
    <Flex flexDir="column" alignItems="center" mb="6">
      <Icon as={Logo} w="60%" h="auto" />
      <Box color="gray.600" mt="-5">
        {description}
      </Box>
    </Flex>
  );
};

export default HeaderLayout;

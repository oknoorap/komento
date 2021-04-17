import { Box } from "@chakra-ui/react";

import Config from "./config";
import Codes from "./codes";
import Preview from "./preview";

const SetupView = () => {
  return (
    <Box>
      <Config />
      <Codes />
      <Preview />
    </Box>
  );
};

export default SetupView;

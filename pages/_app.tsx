import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";

import theme from "themes/default";
import defaultSEOCOnfig from "../next-seo.config";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo {...defaultSEOCOnfig} />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;

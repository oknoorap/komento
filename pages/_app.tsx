import { ChakraProvider } from "@chakra-ui/react";

import theme from "themes/default";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;

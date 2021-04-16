import Document, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

import theme from "themes/default";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
          <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

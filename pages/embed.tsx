import Head from "next/head";
import { Box } from "@chakra-ui/react";

import { IframeMessengerProvider } from "hooks/use-iframe-messenger";
import { CommentProvider } from "hooks/use-comment";
import { EmbedThemeProvider } from "hooks/use-embed-theme";
import { CommentBoxProvider } from "hooks/use-comment-box";
import { CommentListProvider } from "hooks/use-comment-list";
import EmbedLayout from "layouts/embed";
import CommentBox from "views/comment-box";
import CommentList from "views/comment-list";
import CommentLoader from "views/comment-loader";

const EmbedPage = () => {
  return (
    <>
      <Head>
        <link
          as="script"
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/ipfs/dist/index.min.js"
        />
        <link
          as="script"
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/orbit-db/dist/orbitdb.min.js"
        />
        <script
          async
          src="https://cdn.jsdelivr.net/npm/ipfs/dist/index.min.js"
        />
        <script
          async
          src="https://cdn.jsdelivr.net/npm/orbit-db/dist/orbitdb.min.js"
        />
      </Head>

      <EmbedThemeProvider>
        <CommentProvider>
          <IframeMessengerProvider>
            <EmbedLayout>
              <CommentBoxProvider>
                <CommentBox />
              </CommentBoxProvider>
              <CommentListProvider>
                <CommentLoader />
                <CommentList />
              </CommentListProvider>
            </EmbedLayout>
          </IframeMessengerProvider>
        </CommentProvider>
      </EmbedThemeProvider>
    </>
  );
};

export default EmbedPage;

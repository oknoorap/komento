import { useRef, useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";

import { useSetup } from "hooks/use-setup";

const SetupPreviewView = () => {
  const { previewIframeRef, setPreviewLoadStatus } = useSetup();
  const scriptBoxRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!scriptBoxRef.current) return;
    const onIframeLoaded = () => {
      setPreviewLoadStatus(true);
    };

    const script: HTMLScriptElement = document.createElement("script");
    script.dataset.config = JSON.stringify({ demo: true });
    script.src = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/embed.js`;
    script.onload = () => {
      requestAnimationFrame(() => {
        previewIframeRef.current = scriptBoxRef.current.querySelector("iframe");
        previewIframeRef.current.addEventListener("load", onIframeLoaded);
      });
    };

    scriptBoxRef.current.innerHTML = "";
    scriptBoxRef.current.appendChild(script);

    return () => {
      if (previewIframeRef.current) {
        previewIframeRef.current.removeEventListener("load", onIframeLoaded);
      }
    };
  }, []);

  return (
    <Box>
      <Heading
        as="h3"
        fontSize="2xl"
        color="gray.600"
        textAlign="center"
        mb="4"
      >
        Preview
      </Heading>
      <Box ref={scriptBoxRef} />
    </Box>
  );
};

export default SetupPreviewView;

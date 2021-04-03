import { useRef, useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";

const commentConfig = {
  hash: false,
  qs: false,
};

const Homepage = () => {
  const scriptRef = useRef<HTMLScriptElement>();

  useEffect(() => {
    if (scriptRef.current) {
      scriptRef.current.src = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/embed.js`;
    }
  }, []);

  return (
    <Container maxW="container.lg">
      <script
        ref={scriptRef}
        async
        data-config={JSON.stringify(commentConfig)}
      />
    </Container>
  );
};

export default Homepage;

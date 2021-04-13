import { useRef, useEffect } from "react";
import { Flex, Box, Container, Icon, Button, Link } from "@chakra-ui/react";

const commentConfig = {
  hash: false,
  qs: false,
};

const HomepageView = () => {
  const scriptRef = useRef<HTMLScriptElement>();

  useEffect(() => {
    if (scriptRef.current) {
      scriptRef.current.src = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/embed.js`;
    }
  }, []);

  return (
    <>
      <Flex justifyContent="center" mb="8">
        <Button as={Link} href="/setup" colorScheme="cerulean">
          Add to your website!
        </Button>
      </Flex>
      <script
        ref={scriptRef}
        async
        data-config={JSON.stringify(commentConfig)}
      />
    </>
  );
};

export default HomepageView;

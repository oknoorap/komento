import { useRef, useEffect } from "react";
import NextLink from "next/link";
import { Flex, Button, Link, Box } from "@chakra-ui/react";

const HomepageView = () => {
  const scriptBoxRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (scriptBoxRef.current) {
      const script = document.createElement("script");
      script.src = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/embed.js`;
      script.dataset.config = JSON.stringify({ hash: false, qs: false });
      scriptBoxRef.current.innerHTML = "";
      scriptBoxRef.current.appendChild(script);
    }
  }, []);

  return (
    <>
      <Flex justifyContent="center" mb="8">
        <NextLink href="/setup" passHref>
          <Button as={Link} colorScheme="cerulean">
            Add to your website!
          </Button>
        </NextLink>
      </Flex>
      <Box ref={scriptBoxRef} />
    </>
  );
};

export default HomepageView;

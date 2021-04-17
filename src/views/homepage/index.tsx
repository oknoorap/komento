import { useRef, useEffect } from "react";
import NextLink from "next/link";
import {
  Flex,
  Button,
  Link,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const HomepageView = () => {
  const scriptBoxRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!process.browser) return;
    if (!scriptBoxRef.current) return;
    const script = document.createElement("script");
    script.src = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/embed.js`;
    script.dataset.config = btoa(JSON.stringify({ hash: false, qs: false }));
    scriptBoxRef.current.innerHTML = "";
    scriptBoxRef.current.appendChild(script);
  }, []);

  return (
    <>
      <Flex justifyContent="center" mb="4">
        <NextLink href="/setup" passHref>
          <Button as={Link} colorScheme="cerulean">
            Add to your website!
          </Button>
        </NextLink>
      </Flex>
      <Alert status="warning" mb="8">
        <AlertIcon />
        <AlertTitle mr={2} />
        <AlertDescription>
          Komento is still in the Beta phase (not production-ready yet), due to
          database sync / replicate issues. We're fixing it.
        </AlertDescription>
      </Alert>
      <Box ref={scriptBoxRef} />
    </>
  );
};

export default HomepageView;

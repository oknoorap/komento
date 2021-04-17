import { Box, Link } from "@chakra-ui/react";

const FooterLayout = () => {
  const year = new Date().getFullYear();
  return (
    <Box textAlign="center" mt="6">
      &copy; {year} MIT -{" "}
      <Link
        href="https://github.com/oknoorap/komento"
        isExternal
        rel="noopener"
        color="cerulean.500"
        textDecor="underline"
        _hover={{ textDecor: "none" }}
      >
        Komento
      </Link>{" "}
      is an Open Source Software created by{" "}
      <Link
        href="https://github.com/oknoorap"
        isExternal
        rel="noopener"
        color="cerulean.500"
        textDecor="underline"
        _hover={{ textDecor: "none" }}
      >
        Ribhararnus Pracutian
      </Link>
      .
      <br />
      Please free to submit feedback via repository.
    </Box>
  );
};

export default FooterLayout;

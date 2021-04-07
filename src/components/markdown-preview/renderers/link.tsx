import { FC } from "react";
import { Box, Link, LinkProps, Icon } from "@chakra-ui/react";
import { RiShareForwardFill as LinkIcon } from "react-icons/ri";

type LinkRendererProps = {
  href?: string;
  title?: string;
};

const LinkRenderer: FC<LinkRendererProps> = ({ children, href, title }) => {
  const props: LinkProps = { href, title, noOfLines: 1 };
  if (href.slice(0, 4) === "http") {
    props.isExternal = true;
    props.rel = "noopener";
  }

  return (
    <Link color="cerulean.500" {...props}>
      <Box as="span" mr="0.5">
        {children}
      </Box>
      <Icon as={LinkIcon} w="4" h="auto" />
    </Link>
  );
};

export default LinkRenderer;

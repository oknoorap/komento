import { FC } from "react";
import { Container } from "@chakra-ui/react";

import Header from "./header";
import Footer from "./footer";

const DefaultLayout: FC = ({ children }) => {
  return (
    <Container maxW="container.lg" py="4">
      <Header />
      {children}
      <Footer />
    </Container>
  );
};

export default DefaultLayout;

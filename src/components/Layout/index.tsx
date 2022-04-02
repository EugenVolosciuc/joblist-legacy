import { FC } from "react";
import { Box, Container } from "@chakra-ui/react";

import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";

const Layout: FC = ({ children }) => {
  return (
    <Box
      w="full"
      minHeight="100vh"
      backgroundColor="gray.100"
      display="flex"
      flexDirection="column"
    >
      <Header />
      <Container
        maxWidth="container.xl"
        flex="1"
        overflow="hidden"
        alignSelf="center"
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;

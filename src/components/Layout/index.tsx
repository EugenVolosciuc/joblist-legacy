import { FC } from "react";
import { Box } from "@chakra-ui/react";

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
      <Box flex="1">{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;

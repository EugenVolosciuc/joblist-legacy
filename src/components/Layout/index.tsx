import { FC } from "react";
import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";

import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";
import appConfig from "config/app";

type Props = {
  headProps?: {
    title?: string;
  };
};

const Layout: FC<Props> = ({ children, headProps }) => {
  return (
    <>
      <Head>
        <title>
          {headProps?.title
            ? headProps.title + " | " + appConfig.title
            : appConfig.title}
        </title>
      </Head>
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
    </>
  );
};

export default Layout;

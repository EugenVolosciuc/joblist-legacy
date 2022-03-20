import { Box } from "@chakra-ui/react";

import Auth from "components/Auth";
import Layout from "components/Layout";

const LogInPage = () => {
  return (
    <Layout>
      <Box px={[4, 4, 8]}>
        <Auth action="log-in" />
      </Box>
    </Layout>
  );
};

export default LogInPage;

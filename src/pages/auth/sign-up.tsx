import { Box } from "@chakra-ui/react";

import Auth from "components/Auth";
import Layout from "components/Layout";

const SignUpPage = () => {
  return (
    <Layout>
      <Box px={[4, 4, 8]}>
        <Auth action="sign-up" />
      </Box>
    </Layout>
  );
};

export default SignUpPage;

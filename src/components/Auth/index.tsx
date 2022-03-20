import { FC } from "react";
import { Box } from "@chakra-ui/react";

import LogIn from "components/Auth/LogIn";
import SignUp from "components/Auth/SignUp";

type Props = {
  action: "sign-up" | "log-in";
};

const Auth: FC<Props> = ({ action }) => {
  const content = action === "sign-up" ? <SignUp /> : <LogIn />;
  return (
    <Box
      backgroundColor="white"
      borderRadius="md"
      mx="auto"
      mt="8"
      p="8"
      maxWidth={action === "sign-up" ? "1000px" : "500px"}
    >
      {content}
    </Box>
  );
};

export default Auth;

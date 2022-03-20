import { Box, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import UserService, { AuthProviders } from "services/User";

const LogIn = () => {
  const handleSignIn = async (provider: AuthProviders) => {
    switch (provider) {
      case AuthProviders.LinkedIn:
        await UserService.signInWithLinkedIn();
        break;
      case AuthProviders.Google:
      default:
        throw new Error("Auth provider not implemented");
    }
  };
  return (
    <Box display="flex" flexDirection="column">
      <Heading as="h2" textAlign="center">
        Log in to your account
      </Heading>
      <Box display="flex" mt="4">
        <Box
          width="full"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Button
            mt="2"
            colorScheme="linkedin"
            leftIcon={<Icon fontSize="xl" as={FaLinkedin} />}
            onClick={() => handleSignIn(AuthProviders.LinkedIn)}
          >
            Sign up with LinkedIn
          </Button>
          <Button
            mt="2"
            variant="outline"
            leftIcon={<Icon fontSize="xl" as={FcGoogle} />}
            onClick={() => handleSignIn(AuthProviders.Google)}
          >
            Sign up with Google
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LogIn;

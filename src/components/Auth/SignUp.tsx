import { Box, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { UserRole } from "@prisma/client";
import { FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import UserService, { AuthProviders } from "services/User";

const SignUp = () => {
  const handleSignUp = async (provider: AuthProviders, role: UserRole) => {
    switch (provider) {
      case AuthProviders.LinkedIn:
        await UserService.signInWithLinkedIn(true, role);
        break;
      case AuthProviders.Google:
      default:
        throw new Error("Auth provider not implemented");
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      <Heading as="h2" textAlign="center">
        Sign up as a
      </Heading>
      <Box display="flex" flexDirection={["column", "column", "row"]} mt="4">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          borderRightWidth={["0", "0", "2px"]}
          borderBottomWidth={["2px", "2px", "0"]}
          borderColor="gray.200"
          pr={["0", "0", "4"]}
          pb={["4", "4", "0"]}
        >
          <Heading as="h3" size="lg" textAlign="center">
            Recruiter
          </Heading>
          <Text textAlign="center" mt="2" mb="6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Necessitatibus officia esse facere aliquid. Obcaecati, placeat!
          </Text>
          <Box
            display="flex"
            justifyContent="space-around"
            width="full"
            flexWrap="wrap"
          >
            <Button
              mt="2"
              colorScheme="linkedin"
              leftIcon={<Icon fontSize="xl" as={FaLinkedin} />}
              onClick={() =>
                handleSignUp(AuthProviders.LinkedIn, UserRole.RECRUITER)
              }
            >
              Sign up with LinkedIn
            </Button>
            <Button
              mt="2"
              variant="outline"
              leftIcon={<Icon fontSize="xl" as={FcGoogle} />}
              onClick={() =>
                handleSignUp(AuthProviders.Google, UserRole.RECRUITER)
              }
            >
              Sign up with Google
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          ml={["0", "0", "4"]}
          mt={["4", "4", "0"]}
        >
          <Heading as="h3" size="lg" textAlign="center">
            Job Seeker
          </Heading>
          <Text textAlign="center" mt="2" mb="6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Necessitatibus officia esse facere aliquid. Obcaecati, placeat!
          </Text>
          <Box
            display="flex"
            justifyContent="space-around"
            width="full"
            flexWrap="wrap"
          >
            <Button
              mt="2"
              colorScheme="linkedin"
              leftIcon={<Icon fontSize="xl" as={FaLinkedin} />}
              onClick={() =>
                handleSignUp(AuthProviders.LinkedIn, UserRole.JOB_SEEKER)
              }
            >
              Sign up with LinkedIn
            </Button>
            <Button
              mt="2"
              variant="outline"
              leftIcon={<Icon fontSize="xl" as={FcGoogle} />}
              onClick={() =>
                handleSignUp(AuthProviders.Google, UserRole.JOB_SEEKER)
              }
            >
              Sign up with Google
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;

import { useEffect } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import qs from "qs";

import UserService, { useAuth } from "services/User";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { UserRole } from "@prisma/client";

const SignUpRedirectPage = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  useEffect(() => {
    // It takes some time until the user is saved in memory after logging in
    setTimeout(async () => {
      const user = UserService.getAuthedUser();

      if (!user) return router.replace("/");

      const foundUser = await UserService.getUserById(user.id);

      if (!!foundUser) {
        setUser(foundUser);
        router.replace("/jobs");
        return;
      }

      const role = qs.parse(window.location.search.split("?")[1]).role;

      const createdUser = await UserService.createSignedUpUser(
        user,
        role as UserRole
      );

      setUser(createdUser);
      router.replace("/jobs");
    }, 500);
  }, []);

  return (
    <Center
      width="full"
      height="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner />
    </Center>
  );
};

export default SignUpRedirectPage;

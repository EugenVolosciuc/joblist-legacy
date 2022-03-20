import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { User } from "@prisma/client";

import theme from "config/theme";
import UserService, { AuthProvider } from "services/User";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setTimeout(async () => {
      const checkedUser = UserService.getAuthedUser();

      if (checkedUser && !user) {
        const userFromDB = await UserService.getUserById(checkedUser?.id);

        setUser(userFromDB);
      }
    }, 500);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider value={{ user, setUser }}>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;

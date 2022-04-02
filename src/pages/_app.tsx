import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { User } from "@prisma/client";
import { QueryClientProvider } from "react-query";

import appConfig from "config/app";
import queryClient from "config/react-query";
import UserService, { AuthProvider, useAuthListener } from "services/User";

import "react-datepicker/dist/react-datepicker.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "styles/date-picker.css";
import "styles/draftjs-editor.css";
import "styles/pagination.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);
  useAuthListener();

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
    <ChakraProvider theme={appConfig.theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider value={{ user, setUser }}>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;

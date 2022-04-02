import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

import colors from "./colors";

const theme = extendTheme(
  {
    colors,
  },
  withDefaultColorScheme({ colorScheme: "primary" })
);

export default theme;

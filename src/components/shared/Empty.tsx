import { FC } from "react";
import { Text } from "@chakra-ui/react";

type Props = {
  message?: string;
};

const Empty: FC<Props> = ({
  message = "It seeems there is nothing here :/",
}) => {
  return <Text color="gray.800">{message}</Text>;
};

export default Empty;

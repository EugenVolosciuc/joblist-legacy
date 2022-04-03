import { Spinner } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  isLoading?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const Loader: FC<Props> = ({ isLoading = true, size = "lg" }) => {
  if (!isLoading) return null;

  return <Spinner thickness="3px" size={size} color="primary.500" />;
};

export default Loader;

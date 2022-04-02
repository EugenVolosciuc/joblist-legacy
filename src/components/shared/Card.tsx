import { Box } from "@chakra-ui/react";
import { FC } from "react";

const Card: FC = ({ children }) => {
  // TODO: Make this component themeable. Save these Box props in objects and spread to have different variants based on the APP_ID
  return (
    <Box borderRadius="md" p="4" backgroundColor="white" boxShadow="sm">
      {children}
    </Box>
  );
};

export default Card;

import React, { FC } from "react";
import {
  FormControl,
  FormLabel,
  Icon,
  Switch,
  Tooltip,
} from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import { FaQuestionCircle } from "react-icons/fa";

import { Inputs } from ".";

type Props = {
  register: UseFormRegister<Inputs>;
};

const BoostPostSection: FC<Props> = ({ register }) => {
  return (
    <FormControl mb="4" display="flex" alignItems="center">
      <FormLabel htmlFor="isSuperPost" mb="0">
        Boost post
      </FormLabel>
      <Switch id="isSuperPost" {...register("isSuperPost")} />
      <Tooltip label="Boost your post to get more people to see it (highlighted in the website, show up at the top of the email newsletter)">
        <span>
          <Icon as={FaQuestionCircle} color="primary.500" mt="1" ml="2" />
        </span>
      </Tooltip>
    </FormControl>
  );
};

export default BoostPostSection;

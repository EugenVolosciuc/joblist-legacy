import {
  UseFormRegister,
  FieldError,
  Control,
  Controller,
} from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Checkbox,
} from "@chakra-ui/react";
import { Inputs } from "components/Jobs/AddJobPostModal";
import { FC } from "react";

type Props = {
  register: UseFormRegister<Inputs>;
  control: Control<Inputs, object>;
  errors: Record<keyof Inputs | string, FieldError>;
};

const SalaryDetailsSection: FC<Props> = ({ register, control, errors }) => {
  return (
    <>
      <FormControl
        mb="4"
        isInvalid={!!errors.currency}
        isRequired
      ></FormControl>
    </>
  );
};

export default SalaryDetailsSection;

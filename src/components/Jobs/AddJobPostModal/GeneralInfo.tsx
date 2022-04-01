import { FC, useState } from "react";
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
import Datepicker from "react-datepicker";
import { format } from "date-fns";

import { Inputs } from "components/Jobs/AddJobPostModal";
import { INPUT_SIZE } from "constants/INPUT";
import Editor from "components/shared/Editor";

type Props = {
  register: UseFormRegister<Inputs>;
  control: Control<Inputs, object>;
  errors: Record<keyof Inputs | string, FieldError>;
};

const GeneralInfoSection: FC<Props> = ({ register, control, errors }) => {
  return (
    <>
      <FormControl mb="4" isInvalid={!!errors.title} isRequired>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          size={INPUT_SIZE}
          id="title"
          {...register("title", {
            required: "Job title is required",
          })}
        />
        {errors.title && (
          <FormErrorMessage>{errors.title.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl mb="4" isInvalid={!!errors.description} isRequired>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Controller
          control={control}
          name="description"
          rules={{
            required: "Description is required",
          }}
          render={({ field }) => (
            <Editor content={field.value} onChange={field.onChange} />
          )}
        />
      </FormControl>
      <Box display="flex" flexWrap="wrap">
        <FormControl
          mb="4"
          isInvalid={!!errors.location}
          isRequired
          width="auto"
          flex="1"
          marginRight={2}
        >
          <FormLabel htmlFor="location">Location</FormLabel>
          <Input
            size={INPUT_SIZE}
            id="location"
            {...register("location", {
              required: "Job location is required",
            })}
          />
          {errors.location && (
            <FormErrorMessage>{errors.location.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          mb="4"
          isInvalid={!!errors.expiresAt}
          isRequired
          width="auto"
          flex="1"
          marginLeft={2}
        >
          <FormLabel htmlFor="expiresAt">Expiration date</FormLabel>
          <Controller
            control={control}
            name="expiresAt"
            rules={{
              required: "The job post expiration date is required",
            }}
            render={({ field }) => (
              <Datepicker
                id="expiresAt"
                value={format(field.value, "dd/MM/yyyy")}
                onChange={field.onChange}
              />
            )}
          />
        </FormControl>
        <FormControl mb="4">
          <Checkbox id="includeSalary" {...register("includeSalary")}>
            Include salary details
          </Checkbox>
        </FormControl>
      </Box>
    </>
  );
};

export default GeneralInfoSection;

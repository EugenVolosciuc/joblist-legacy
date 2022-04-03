import { FC } from "react";
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
  Switch,
  Divider,
} from "@chakra-ui/react";
import Datepicker from "react-datepicker";
import { format } from "date-fns";

import { Inputs } from "components/Jobs/AddEditJobPostModal";
import { INPUT_SIZE } from "constants/INPUT";
import Editor, { emptyEditorLength } from "components/shared/Editor";

type Props = {
  register: UseFormRegister<Inputs>;
  control: Control<Inputs, object>;
  errors: Record<keyof Inputs | string, FieldError>;
  initialDescription?: string;
};

const GeneralInfoSection: FC<Props> = ({
  register,
  control,
  errors,
  initialDescription,
}) => {
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
            validate: {
              nothingTyped: (v) =>
                v.length > emptyEditorLength || "Description is required",
            },
          }}
          render={({ field }) => (
            <Editor
              initialEditorContent={initialDescription}
              onChange={field.onChange}
            />
          )}
        />
        {errors.description && (
          <FormErrorMessage>{errors.description.message}</FormErrorMessage>
        )}
      </FormControl>
      <Box display="flex" flexWrap="wrap">
        <FormControl
          mb="4"
          isInvalid={!!errors.location}
          isRequired
          width="auto"
          flex="1"
          marginRight={3}
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
          marginLeft={3}
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
                value={format(
                  typeof field.value === "string" // this happens for defaultValues, as we get an ISO string from the backend
                    ? new Date(field.value)
                    : field.value,
                  "dd/MM/yyyy"
                )}
                onChange={field.onChange}
              />
            )}
          />
        </FormControl>
      </Box>
      <Divider mt="2" mb="6" />
      <FormControl mb="4" display="flex" alignItems="center">
        <FormLabel htmlFor="includeSalary" mb="0">
          Include salary details
        </FormLabel>
        <Switch id="includeSalary" {...register("includeSalary")} />
      </FormControl>
    </>
  );
};

export default GeneralInfoSection;

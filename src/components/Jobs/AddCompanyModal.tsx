import { FC, FormEventHandler, useCallback, useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  FormControl,
  FormLabel,
  Image,
} from "@chakra-ui/react";
import { AsyncSelect } from "chakra-react-select";
import { Company } from "@prisma/client";
import debounce from "lodash.debounce";

import CompanyService from "services/Company";
import { truncate } from "utils/string-manipulations";
import UserService, { useAuth } from "services/User";
import { clientErrorHandler } from "utils/error-handlers";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  callback: () => void;
};

const CompanyOption = ({
  data,
  selectOption,
  innerProps,
}: {
  data: Company;
  [key: string]: any;
}) => {
  return (
    <Box
      display="flex"
      onClick={() => selectOption(data)}
      borderBottom="1px solid"
      borderColor="gray.100"
      cursor="pointer"
      p="2"
      _hover={{
        backgroundColor: "gray.200",
      }}
      {...innerProps}
    >
      <Box pr="2" {...(!data.logoURL && { boxSize: "10" })}>
        {data.logoURL && (
          <Image
            objectFit="contain"
            boxSize="10"
            src={data.logoURL}
            alt={`${data.name} logo`}
          />
        )}
      </Box>
      <Box flex="1" {...(!data.logoURL && { pl: "2" })}>
        <Text fontWeight="bold" fontSize="sm">
          {data.name}
        </Text>
        {data.description && (
          <Text fontSize="xs" color="gray.400">
            {truncate(data.description, 30)}
          </Text>
        )}
      </Box>
    </Box>
  );
};

const AddCompanyModal: FC<Props> = ({ isOpen, onClose, callback }) => {
  const [creatingCompany, setCreatingCompany] = useState(false);
  const { user, setUser } = useAuth();
  const selectRef = useRef<Company | null>();

  const handleAddCompany: FormEventHandler<HTMLElement> = async (event) => {
    event.preventDefault();
    const selectedCompany = selectRef.current as Company;

    try {
      setCreatingCompany(true);
      // The company is not yet added to our database, so we're adding it
      let companyId = selectedCompany?.id;
      if (!companyId) {
        const company = await CompanyService.createCompany(selectedCompany);

        companyId = company.id;
      }

      const updatedUser = await UserService.updateUser(user?.id as string, {
        companyId,
      });

      setUser(updatedUser);
      setCreatingCompany(false);
      onClose();
      callback();
    } catch (error) {
      setCreatingCompany(false);
      clientErrorHandler(error);
    }
  };

  const handleCompanySearch = useCallback(
    debounce(async (query: string) => {
      if (query.length >= 3) {
        const data = await CompanyService.searchCompanies(query);

        return data;
      }

      return [];
    }, 100),
    []
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleAddCompany}>
        <ModalHeader>Add a company to your profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Before creating a new job post, please select a company for which
            you are recruiting.
          </Text>
          <FormControl mt="4">
            <FormLabel htmlFor="company">Search for a company</FormLabel>
            <AsyncSelect
              name="company"
              id="company"
              loadOptions={handleCompanySearch}
              components={{ Option: CompanyOption }}
              getOptionValue={(option) => option.id || ""}
              getOptionLabel={(option) => option.name}
              onChange={(value) => {
                selectRef.current = value;
              }}
              isClearable
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button isLoading={creatingCompany} type="submit">
            Add company
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCompanyModal;

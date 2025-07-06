import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";

import axios from "axios";
import { useEffect, useState } from "react";
import { UseSupplierStoreUpdateDelete } from "../../contexts/store";
import { UseRetrieveSupplier } from "../../hooks/UseRetrieveSupplier";
import ModalSupplier from "../Modals/ModalSupplier";
import SkeletonDataClient from "../skeletons/SkeletonDataClient";
import ButtonsSend from "./ButtonsSend";
import DataClient from "./DataSupplier";
import FormClientSearch from "./FormSupplierSearch";

type Props = {};

function ClientSearch({}: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { supplier, setSupplier } = UseSupplierStoreUpdateDelete();

  const [rif, setRif] = useState<number>(0);

  const { data, isLoading, error, refetch } = UseRetrieveSupplier(rif);

  useEffect(() => {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      onOpen();
    }

    if (data) {
      setSupplier(data);
    }
  }, [error, onClose, isLoading]);

  return (
    <>
      <Flex h={60} m="3" gap={3}>
        <Box border="1px" borderColor="black" borderRadius="md" flex={7}>
          <Heading size={"lg"} ml={4} mt={2}>
            Datos del proveedor
          </Heading>
          {isLoading && <SkeletonDataClient />}
          {supplier !== undefined ? <DataClient data={supplier} /> : ""}
        </Box>
        <Box alignContent={"center"} flex={3} justifyItems={"center"}>
          {supplier ? (
            <ButtonsSend />
          ) : (
            <FormClientSearch setRif={setRif} refetch={refetch} />
          )}
        </Box>
      </Flex>

      <ModalSupplier isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default ClientSearch;

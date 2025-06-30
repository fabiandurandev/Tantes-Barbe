import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import UseClientSearch from "../../hooks/UseClientSearch";
import DataClient from "./DataClient";
import axios from "axios";
import ModalClient from "../Modals/ModalClient";
import SkeletonDataClient from "../skeletons/SkeletonDataClient";
import FormClientSearch from "./FormClientSearch";
import ButtonsSend from "./ButtonsSend";
import { useClientStore } from "../../contexts/store";

type Props = {};

function ClientSearch({}: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { client, setClient } = useClientStore();

  const [cedula, setCedula] = useState<number>(0);

  const { data, isLoading, error, refetch } = UseClientSearch(cedula);

  useEffect(() => {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      onOpen();
    }

    if (data) {
      setClient(data);
    }
  }, [error, onClose, isLoading]);

  return (
    <>
      <Flex h={60} m="3" gap={3}>
        <Box border="1px" borderColor="black" borderRadius="md" flex={7}>
          <Heading size={"lg"} ml={4} mt={2}>
            Datos del cliente
          </Heading>
          {isLoading && <SkeletonDataClient />}
          {client !== undefined ? <DataClient data={client} /> : ""}
        </Box>
        <Box alignContent={"center"} flex={3} justifyItems={"center"}>
          {client ? (
            <ButtonsSend />
          ) : (
            <FormClientSearch setCedula={setCedula} refetch={refetch} />
          )}
        </Box>
      </Flex>

      <ModalClient isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default ClientSearch;

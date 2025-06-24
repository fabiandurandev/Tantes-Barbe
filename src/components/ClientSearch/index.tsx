import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { clientSchema, type ClientSearchFormType } from "../../schemas/Client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import UseClientSearch from "../../hooks/UseClientSearch";
import DataClient from "./DataClient";
import axios from "axios";
import ModalClient from "../Modals/ModalClient";
import SkeletonDataClient from "../skeletons/SkeletonDataClient";

const styleForm = {
  width: "100%",
  height: "100%",
  alignContent: "center",
};

type Props = {};

function ClientSearch({}: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [cedula, setCedula] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ClientSearchFormType>({
    resolver: zodResolver(clientSchema),
  });

  const { data, isLoading, error, refetch } = UseClientSearch(cedula);

  const onSubmit = () => {
    refetch();
    reset();
  };

  useEffect(() => {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      onOpen();
    }
  }, [error, onClose]);

  return (
    <>
      <Flex h={60} m="3" gap={3}>
        <Box border="1px" borderColor="black" borderRadius="md" flex={7}>
          <Heading size={"lg"} ml={4} mt={2}>
            Datos del cliente
          </Heading>
          {isLoading && <SkeletonDataClient />}
          {data !== undefined ? <DataClient data={data} /> : ""}
        </Box>
        <Box alignContent={"center"} flex={3} justifyItems={"center"}>
          <form style={styleForm} onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel color={"gray.400"} ml={2}>
                Cédula:
              </FormLabel>
              <Flex gridRow={3} w={"100%"} p={2} gap={1}>
                <Input
                  {...register("cedulaClient")}
                  flex={"7"}
                  size={"md"}
                  placeholder="Ingrese la cédula del cliente"
                  border={"1px"}
                />
                <Button
                  onClick={() => setCedula(getValues("cedulaClient"))}
                  type="submit"
                  size={"md"}
                  flex={"3"}
                  bg={"transparent"}
                >
                  <FaSearch size={20} color="#2E66E1" />
                </Button>
              </Flex>
            </FormControl>
            {errors && (
              <Text pl={2} color={"red.500"}>
                {errors.cedulaClient?.message}
              </Text>
            )}
          </form>
        </Box>
      </Flex>

      <ModalClient isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default ClientSearch;

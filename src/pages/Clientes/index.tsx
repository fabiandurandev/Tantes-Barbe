import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import AddClient from "../../components/Modals/AddClient";
import CedulaClientModal from "../../components/Modals/CedulaClientModal";
import ListClientModal from "../../components/Modals/ListClientModal ";
import UpdateClient from "../../components/Modals/UpdateClient";
import { UseClientsListStore } from "../../contexts/store";
import UseListClient from "../../hooks/UseListClient";

const ServiceMenu = () => {
  const buttonBg = useColorModeValue("blue.500", "blue.200");
  const buttonColor = useColorModeValue("white", "gray.800");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.300");

  const addClientModal = useDisclosure();

  const updateClientModal = useDisclosure();

  const cedulaClientModal = useDisclosure();

  const listClientModal = useDisclosure();

  const { refetch, data } = UseListClient();

  const { setClientsList } = UseClientsListStore();

  useEffect(() => {
    if (data) setClientsList(data);
  }, [data]);

  const consultarClientes = () => {
    refetch();

    listClientModal.onOpen();
  };

  return (
    <Flex minH="75vh" direction="column" justify="center" align="center" p={6}>
      <Box p={6} maxW="4xl" mx="auto" textAlign="center">
        <HStack spacing={20} justify="center">
          <VStack>
            <Button
              size="lg"
              bg={buttonBg}
              color={buttonColor}
              _hover={{ bg: buttonHoverBg }}
              minW="300px"
              minH="300px"
              leftIcon={
                <Image src="/img/agregar.png" boxSize="180px" alt="Agregar" />
              }
              onClick={addClientModal.onOpen}
            ></Button>
            <Text fontWeight="bold" fontSize="lg">
              AGREGAR NUEVO CLIENTE
            </Text>
          </VStack>
          <Image src="/img/linea.png" boxSize="180px" alt="Agregar" />
          <VStack>
            <Button
              size="lg"
              bg={buttonBg}
              color={buttonColor}
              _hover={{ bg: buttonHoverBg }}
              minW="300px"
              minH="300px"
              leftIcon={
                <Image
                  src="/img/modificar.png"
                  boxSize="180px"
                  alt="Modificar"
                />
              }
              onClick={cedulaClientModal.onOpen}
            ></Button>
            <Text fontWeight="bold" fontSize="lg">
              MODIFICAR CLIENTE
            </Text>
          </VStack>
          <Image src="/img/linea.png" boxSize="180px" alt="Agregar" />
          <VStack>
            <Button
              size="lg"
              bg={buttonBg}
              color={buttonColor}
              _hover={{ bg: buttonHoverBg }}
              minW="300px"
              minH="300px"
              leftIcon={
                <Image
                  src="/img/consultar.png"
                  boxSize="180px"
                  alt="Consultar"
                />
              }
              onClick={consultarClientes}
            ></Button>
            <Text fontWeight="bold" fontSize="lg">
              CONSULTAR CLIENTES
            </Text>
          </VStack>
        </HStack>
      </Box>
      <AddClient addClientModal={addClientModal} />
      <UpdateClient modalUpdateClient={updateClientModal} />
      <CedulaClientModal
        cedulaClientModal={cedulaClientModal}
        updateClientModal={updateClientModal}
      />
      <ListClientModal listClientModal={listClientModal} />
    </Flex>
  );
};

export default ServiceMenu;

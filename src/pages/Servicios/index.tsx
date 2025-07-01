import {
  Box,
  HStack,
  Button,
  useColorModeValue,
  Flex,
  Text,
  VStack,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import Services from "../../components/Modals/AddServices";
import { useNavigate } from "react-router";
import UpdateService from "../../components/Modals/UpdateService";
import CodigoServiceModal from "../../components/Modals/CodigoService";
import {
  UseServicesStore,
  UseServiceStoreUpdateDelete,
} from "../../contexts/store";
import ListServiceModal from "../../components/Modals/ListServiceModal";
import UseListServices from "../../hooks/UseListServices";
import { useEffect } from "react";

const ServiceMenu = () => {
  const buttonBg = useColorModeValue("blue.500", "blue.200");
  const buttonColor = useColorModeValue("white", "gray.800");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.300");

  const { service } = UseServiceStoreUpdateDelete();

  const modal1 = useDisclosure();
  const modal2 = useDisclosure();
  const modal3 = useDisclosure();
  const modal4 = useDisclosure();

  const { refetch, data } = UseListServices();

  const { setServices } = UseServicesStore();

  useEffect(() => {
    if (data) setServices(data);
  }, [data]);

  const consultarServicios = () => {
    refetch();

    modal4.onOpen();
  };

  console.log(data);

  return (
    <Flex minH="75vh" direction="column" justify="center" align="center" p={6}>
      <Box p={6} maxW="4xl" mx="auto" textAlign="center">
        <HStack spacing={20} justify="center">
          <VStack>
            <Button
              onClick={modal1.onOpen}
              size="lg"
              bg={buttonBg}
              color={buttonColor}
              _hover={{ bg: buttonHoverBg }}
              minW="300px"
              minH="300px"
              leftIcon={
                <Image src="/img/agregar.png" boxSize="180px" alt="Agregar" />
              }
            ></Button>
            <Text fontWeight="bold" fontSize="lg">
              AGREGAR NUEVO SERVICIO
            </Text>
          </VStack>
          <Image src="/img/linea.png" boxSize="180px" alt="Agregar" />
          <Services modal1={modal1} />
          <VStack>
            <Button
              onClick={modal3.onOpen}
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
            ></Button>
            <Text fontWeight="bold" fontSize="lg">
              MODIFICAR SERVICIO
            </Text>
          </VStack>
          <Image src="/img/linea.png" boxSize="180px" alt="Agregar" />
          <CodigoServiceModal modal2={modal2} modal3={modal3} />
          {service && <UpdateService service={service} modal2={modal2} />}
          <VStack>
            <Button
              onClick={consultarServicios}
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
            ></Button>
            <Text fontWeight="bold" fontSize="lg">
              CONSULTAR SERVICIOS
            </Text>
            <ListServiceModal modal4={modal4} />
          </VStack>
        </HStack>
      </Box>
    </Flex>
  );
};

export default ServiceMenu;

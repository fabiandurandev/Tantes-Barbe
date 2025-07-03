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
import AddEmployee from "../../components/Modals/AddEmployee";
import CedulaEmployeeModal from "../../components/Modals/CedulaEmployee";
import UpdateEmployee from "../../components/Modals/UpdateEmployee";
import ListEmployeeModal from "../../components/Modals/ListEmployeeModal";
import UseListEmployees from "../../hooks/UseListEmployees";
import { useEffect } from "react";
import { UseEmployeesListStore } from "../../contexts/store";

const ServiceMenu = () => {
  const buttonBg = useColorModeValue("blue.500", "blue.200");
  const buttonColor = useColorModeValue("white", "gray.800");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.300");

  const modalAddEmployee = useDisclosure();
  const cedulaEmployeeModal = useDisclosure();
  const updateEmployeeModal = useDisclosure();
  const listEmployeeModal = useDisclosure();

  const { refetch, data } = UseListEmployees();

  const { setEmployeesList } = UseEmployeesListStore();

  useEffect(() => {
    if (data) setEmployeesList(data);
  }, [data]);

  const onClick = () => {
    refetch();
    listEmployeeModal.onOpen();
  };

  return (
    <Flex minH="75vh" direction="column" justify="center" align="center" p={6}>
      <Box p={6} maxW="4xl" mx="auto" textAlign="center">
        <HStack spacing={20} justify="center">
          <VStack>
            <Button
              onClick={modalAddEmployee.onOpen}
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
              AGREGAR NUEVO EMPLEADO
            </Text>
          </VStack>
          <Image src="/img/linea.png" boxSize="180px" alt="Agregar" />
          <AddEmployee modalAddEmployee={modalAddEmployee} />
          <VStack>
            <Button
              onClick={cedulaEmployeeModal.onOpen}
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
              MODIFICAR EMPLEADO
            </Text>
            <CedulaEmployeeModal
              UpdateEmployeeModal={updateEmployeeModal}
              CedulaEmployeeModal={cedulaEmployeeModal}
            />
            <UpdateEmployee updateEmployeeModal={updateEmployeeModal} />
          </VStack>
          <Image src="/img/linea.png" boxSize="180px" alt="Agregar" />
          <VStack>
            <Button
              onClick={onClick}
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
              CONSULTAR EMPLEADOS
            </Text>
            <ListEmployeeModal modalListEmployee={listEmployeeModal} />
          </VStack>
        </HStack>
      </Box>
    </Flex>
  );
};

export default ServiceMenu;

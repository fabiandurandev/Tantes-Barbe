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
import AddSupplier from "../../components/Modals/AddSuppliers";
import RifSupplier from "../../components/Modals/RifSupplier";
import UpdateSupplier from "../../components/Modals/UpdateSuppliers";
import { UseSupplierStoreUpdateDelete } from "../../contexts/store";

const SupplierMenu = () => {
  const buttonBg = useColorModeValue("blue.500", "blue.200");
  const buttonColor = useColorModeValue("white", "gray.800");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.300");

  const modalAddSupplier = useDisclosure();
  const modalUpdateSupplier = useDisclosure();
  const modalRifSupplier = useDisclosure();

  const { supplier } = UseSupplierStoreUpdateDelete();

  return (
    <Flex minH="75vh" direction="column" justify="center" align="center" p={6}>
      <Box p={6} maxW="4xl" mx="auto" textAlign="center">
        <HStack spacing={20} justify="center">
          <VStack>
            <Button
              onClick={modalAddSupplier.onOpen}
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
              AGREGAR NUEVO PROVEEDOR
            </Text>
          </VStack>
          <Image src="/img/linea.png" boxSize="180px" alt="Agregar" />
          <AddSupplier modalAddSupplier={modalAddSupplier} />
          <VStack>
            <Button
              onClick={modalRifSupplier.onOpen}
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
              MODIFICAR PROVEEDOR
            </Text>
          </VStack>
          <Image src="/img/linea.png" boxSize="180px" alt="Agregar" />
          {supplier && (
            <UpdateSupplier
              supplier={supplier}
              modalUpdateSupplier={modalUpdateSupplier}
            />
          )}
          <RifSupplier
            modalRifSupplier={modalRifSupplier}
            modalUpdateSupplier={modalUpdateSupplier}
          />
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
            ></Button>
            <Text fontWeight="bold" fontSize="lg">
              CONSULTAR PROVEEDOR
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Flex>
  );
};

export default SupplierMenu;

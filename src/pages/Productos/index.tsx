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
import AddProduct from "../../components/Modals/AddProduct";
import CodigoProductModal from "../../components/Modals/CodigoProduct";
import UpdateProductModal from "../../components/Modals/UpdateProductModal";
import UseListProducts from "../../hooks/UseProductsList";
import useProductsStore from "../../contexts/store";
import { useEffect } from "react";
import ListProductModal from "../../components/Modals/ListProductModal";

const ProductsMenu = () => {
  const buttonBg = useColorModeValue("blue.500", "blue.200");
  const buttonColor = useColorModeValue("white", "gray.800");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.300");

  const addProductModal = useDisclosure();
  const codigoProductModal = useDisclosure();
  const updateProductModal = useDisclosure();
  const listProductModal = useDisclosure();

  const { refetch, data } = UseListProducts();

  const { setProducts } = useProductsStore();

  useEffect(() => {
    if (data) setProducts(data);
  }, [data]);

  const consultarProductos = () => {
    refetch();

    listProductModal.onOpen();
  };

  return (
    <Flex minH="75vh" direction="column" justify="center" align="center" p={6}>
      <Box p={6} maxW="4xl" mx="auto" textAlign="center">
        <HStack spacing={20} justify="center">
          <VStack>
            <Button
              onClick={addProductModal.onOpen}
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
              AGREGAR NUEVO PRODUCTO
            </Text>
            <AddProduct addProductModal={addProductModal} />
          </VStack>
          <Image src="/img/linea.png" boxSize="180px" alt="Agregar" />
          <VStack>
            <Button
              onClick={codigoProductModal.onOpen}
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
              MODIFICAR PRODUCTO
            </Text>
            <CodigoProductModal
              updateProductModal={updateProductModal}
              codigoProductModal={codigoProductModal}
            />
            <UpdateProductModal updateProductModal={updateProductModal} />
          </VStack>
          <Image src="/img/linea.png" boxSize="180px" alt="Agregar" />
          <VStack>
            <Button
              onClick={consultarProductos}
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
              CONSULTAR PRODUCTOS
            </Text>
            <ListProductModal listProductModal={listProductModal} />
          </VStack>
        </HStack>
      </Box>
    </Flex>
  );
};

export default ProductsMenu;

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UseAddProduct } from "../../hooks/UseAddProduct";
import {
  addProductSchema,
  type addProductFormType,
} from "../../schemas/AddProductSchema";

type Props = {
  addProductModal: {
    isOpen: boolean;
    onClose: () => void;
  };
};

function AddProduct({ addProductModal }: Props) {
  const {
    register,
    reset: resetForm,
    handleSubmit,
    formState: { errors },
  } = useForm<addProductFormType>({
    resolver: zodResolver(addProductSchema),
  });

  const { mutate, reset } = UseAddProduct();

  const toast = useToast();

  const onSubmit = (dataProduct: addProductFormType) => {
    const productLoad = {
      nombreProducto: dataProduct.nombreProducto,
      codigoProducto: dataProduct.codigoProducto,
      stock: 0,
      precioProducto: dataProduct.precioProducto,
    };

    mutate(productLoad, {
      onSuccess: () => {
        addProductModal.onClose();
        resetForm();
        reset();
        toast({
          title: "Producto agregado",
          description: "Se ha agregado el producto con éxito!",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      },
      onError: () => {
        toast({
          title: "Error al agregar producto.",
          description: "El código del producto ya existe, verifique el código.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      },
    });
  };

  const cancelar = () => {
    addProductModal.onClose();
    resetForm();
  };

  return (
    <>
      <Modal isOpen={addProductModal.isOpen} onClose={cancelar}>
        <ModalOverlay />
        <ModalContent borderRadius="20px">
          <ModalHeader
            borderTopRadius="20px"
            bg="blue.600"
            color="white"
            fontSize="lg"
            fontWeight="bold"
          >
            Agregar nuevos productos
          </ModalHeader>
          <ModalCloseButton color="white" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody py={4}>
              <Stack spacing={4}>
                <Heading as="h3" size="md" fontWeight="semibold">
                  Datos del Producto
                </Heading>

                <FormControl isInvalid={!!errors.codigoProducto}>
                  <FormLabel>Código:</FormLabel>
                  <Input
                    {...register("codigoProducto")}
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.codigoProducto && errors.codigoProducto.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.nombreProducto}>
                  <FormLabel>Descripción:</FormLabel>
                  <Input
                    {...register("nombreProducto")}
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.nombreProducto && errors.nombreProducto.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.precioProducto}>
                  <FormLabel>Precio:</FormLabel>
                  <Input
                    {...register("precioProducto")}
                    type="number"
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.precioProducto && errors.precioProducto.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                borderRadius="md"
                leftIcon={<span>+</span>}
              >
                Agregar
              </Button>
              <Button variant="outline" onClick={cancelar} borderRadius="md">
                CANCELAR
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddProduct;

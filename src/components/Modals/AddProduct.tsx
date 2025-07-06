import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  addProductSchema,
  type addProductFormType,
} from "../../schemas/AddProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseAddProduct } from "../../hooks/UseAddProduct";

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
    formState:{errors} 
  } = useForm<addProductFormType>({
    resolver: zodResolver(addProductSchema),
  });

  const { mutate, reset } = UseAddProduct();

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

                <FormControl>
                  <FormLabel>Código:</FormLabel>
                  <Input
                    {...register("codigoProducto")}
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                   {errors && ( <Text color={"red"}>{errors.codigoProducto?.message}</Text>)}

                  <FormLabel>Descripción:</FormLabel>
                  <Input
                    {...register("nombreProducto")}
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                   {errors && ( <Text color={"red"}>{errors.nombreProducto?.message}</Text>)}

                  <FormLabel>Precio:</FormLabel>
                  <Input
                    {...register("precioProducto")}
                    type="number"
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                   {errors && ( <Text color={"red"}>{errors.precioProducto?.message}</Text>)}
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

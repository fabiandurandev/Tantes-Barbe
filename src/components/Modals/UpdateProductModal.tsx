import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UseProductStoreUpdateDelete } from "../../contexts/store";
import { UseUpdateProduct } from "../../hooks/UseUpdateProduct";
import {
  addProductSchema,
  type addProductFormType,
} from "../../schemas/AddProductSchema";

type Props = {
  updateProductModal: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
  };
};

function UpdateProductModal({ updateProductModal }: Props) {
  const { resetProduct, product } = UseProductStoreUpdateDelete();

  const queryClient = useQueryClient();

  const cancelar = () => {
    updateProductModal.onClose();
    resetProduct();
    queryClient.removeQueries({ queryKey: ["product"] });
  };

  const { register, handleSubmit, reset } = useForm<addProductFormType>({
    resolver: zodResolver(addProductSchema),
  });

  const { mutate } = UseUpdateProduct();

  const onSubmit = (data: addProductFormType) => {
    mutate(
      {
        codigoProducto: data.codigoProducto,
        data: {
          nombreProducto: data.nombreProducto,
          precioProducto: data.precioProducto,
        },
      },
      {
        onSuccess: () => {
          updateProductModal.onClose();
          reset();
          queryClient.removeQueries({ queryKey: ["product"] });
        },
      }
    );
  };
  return (
    <>
      <Modal isOpen={updateProductModal.isOpen} onClose={cancelar}>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"}>
          <ModalHeader
            borderTopRadius={"20px"}
            bg={"blue.600"}
            color="white"
            fontSize="lg"
            fontWeight="bold"
          >
            Modificar Producto
          </ModalHeader>
          <ModalCloseButton color="white" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody py={4}>
              <Stack spacing={6}>
                <Text fontSize="md" fontWeight="semibold">
                  Producto
                </Text>

                <FormControl>
                  <FormLabel>Código:</FormLabel>
                  <Input
                    {...register("codigoProducto")}
                    readOnly
                    defaultValue={product?.codigoProducto}
                    placeholder="#####"
                    borderWidth={2}
                    borderRadius="md"
                    fontSize="lg"
                    fontWeight="bold"
                  />
                  <FormLabel>Descripción:</FormLabel>
                  <Input
                    {...register("nombreProducto")}
                    defaultValue={product?.nombreProducto}
                    placeholder=" "
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormLabel>Precio:</FormLabel>
                  <Input
                    {...register("precioProducto")}
                    defaultValue={product?.precioProducto}
                    type="number"
                    placeholder="#####"
                    borderWidth={2}
                    borderRadius="md"
                    fontSize="lg"
                    fontWeight="bold"
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            {/* Parte de los botones */}

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3} borderRadius="md">
                Actualizar
              </Button>

              <Button variant="ghost" onClick={cancelar} borderRadius="md">
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateProductModal;

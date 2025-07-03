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
  Spinner,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UseProductStoreUpdateDelete } from "../../contexts/store";
import UseRetrieveProduct from "../../hooks/UseRetrieveProduct";
import type { retrieveProductFormType } from "../../schemas/RetrieveProductSchema";
import retrieveProductSchema from "../../schemas/RetrieveProductSchema";

type Props = {
  codigoProductModal: {
    isOpen: boolean;
    onClose: () => void;
  };
  updateProductModal: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
  };
};

function CodigoProductModal({ codigoProductModal, updateProductModal }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<retrieveProductFormType>({
    resolver: zodResolver(retrieveProductSchema),
  });

  const [codigo, setCodigo] = useState<number>(0);

  const {
    data: dataService,
    refetch,
    error,
    isLoading,
  } = UseRetrieveProduct(codigo);

  const { setProduct } = UseProductStoreUpdateDelete();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (dataService) {
      setProduct(dataService);
      updateProductModal.onOpen();
      codigoProductModal.onClose();
      reset();
    }
  }, [dataService]);

  const onSubmit = () => {
    refetch();
  };

  const cancelar = () => {
    queryClient.removeQueries({ queryKey: ["product"] });
    codigoProductModal.onClose();
    reset();
  };

  return (
    <>
      <Modal isOpen={codigoProductModal.isOpen} onClose={cancelar}>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"}>
          <ModalHeader bg={"blue.600"} color="white" borderTopRadius={"20px"}>
            Codigo Producto
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl>
                <FormLabel>Codigo:</FormLabel>
                <Input
                  {...register("codigoProducto")}
                  placeholder="Ingrese el codigo del producto"
                />
                {isLoading && <Spinner />}

                {errors && (
                  <Text color={"red"}>{errors.codigoProducto?.message}</Text>
                )}

                {error && <Text color={"red"}>Producto no encontrado</Text>}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={cancelar}>
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setCodigo(getValues("codigoProducto"))}
                type="submit"
              >
                Aceptar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CodigoProductModal;

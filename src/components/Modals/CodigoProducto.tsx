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
import { useProductRetrieveStore } from "../../contexts/store";
import UseRetrieveProduct from "../../hooks/UseRetrieveProduct";
import type { retrieveProductFormType } from "../../schemas/RetrieveProduct";
import retrieveProduct from "../../schemas/RetrieveProduct";

type Props = {
  modal3: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
  };
  modal2: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
  };
};

function CodigoProducto({ modal3, modal2 }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<retrieveProductFormType>({
    resolver: zodResolver(retrieveProduct),
  });

  const [codigo, setCodigo] = useState<number>(0);

  const {
    data: dataProduct,
    refetch,
    error,
    isLoading,
  } = UseRetrieveProduct(codigo);

  const { setProduct } = useProductRetrieveStore();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (dataProduct) {
      setProduct(dataProduct);
      modal2.onOpen();
      modal3.onClose();
      reset();
    }
  }, [dataProduct]);

  const onSubmit = () => {
    refetch();
  };

  const cancelar = () => {
    queryClient.removeQueries({ queryKey: ["product"] });
    modal3.onClose();
    reset();
  };
  return (
    <>
      <Modal isOpen={modal3.isOpen} onClose={cancelar}>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"}>
          <ModalHeader bg={"blue.600"} color="white" borderTopRadius={"20px"}>
            Codigo Servicio
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl>
                <FormLabel>Codigo:</FormLabel>
                <Input
                  {...register("CodigoProducto")}
                  placeholder="Ingrese el codigo del producto"
                />
                {isLoading && <Spinner />}

                {errors && (
                  <Text color={"red"}>{errors.CodigoProducto?.message}</Text>
                )}

                {error && <Text color={"red"}>Servicio no encontrado</Text>}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={cancelar}>
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setCodigo(getValues("CodigoProducto"))}
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

export default CodigoProducto;

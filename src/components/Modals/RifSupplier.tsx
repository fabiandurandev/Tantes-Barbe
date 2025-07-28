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
import { UseSupplierStoreUpdateDelete } from "../../contexts/store";
import { UseRetrieveSupplier } from "../../hooks/UseRetrieveSupplier";
import {
  retrieveSupplierSchema,
  type retrieveSupplierFormType,
} from "../../schemas/RetrieveSupplier";

type Props = {
  modalRifSupplier: {
    isOpen: boolean;
    onClose: () => void;
  };
  modalUpdateSupplier: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
};

function RifSupplier({ modalRifSupplier, modalUpdateSupplier }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<retrieveSupplierFormType>({
    resolver: zodResolver(retrieveSupplierSchema),
  });

  const [rif, setRif] = useState<number>(0);

  const {
    data: dataSupplier,
    refetch,
    error,
    isLoading,
  } = UseRetrieveSupplier(rif);

  const { setSupplier } = UseSupplierStoreUpdateDelete();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (dataSupplier) {
      setSupplier(dataSupplier);
      modalUpdateSupplier.onOpen();
      modalRifSupplier.onClose();
      reset();
    }
  }, [dataSupplier]);

  const onSubmit = () => {
    refetch();
  };

  const cancelar = () => {
    queryClient.removeQueries({ queryKey: ["supplier"] });
    modalRifSupplier.onClose();
    reset();
  };

  return (
    <>
      <Modal isOpen={modalRifSupplier.isOpen} onClose={cancelar}>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"}>
          <ModalHeader bg={"blue.600"} color="white" borderTopRadius={"20px"}>
            Rif del Proveedor
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl>
                <FormLabel>Rif:</FormLabel>
                <Input
                  {...register("rifProveedor")}
                  placeholder="Ingrese el rif del proveedor."
                />
                {isLoading && <Spinner />}

                {errors && (
                  <Text color={"red"}>{errors.rifProveedor?.message}</Text>
                )}

                {error && <Text color={"red"}>Proveedor no encontrado</Text>}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setRif(getValues("rifProveedor"))}
                type="submit"
              >
                Aceptar
              </Button>
              <Button variant="ghost" onClick={cancelar}>
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RifSupplier;

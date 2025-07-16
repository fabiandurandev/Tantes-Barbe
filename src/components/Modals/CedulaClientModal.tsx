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
import { useClientStore } from "../../contexts/store";
import UseClientSearch from "../../hooks/UseClientSearch";
import type { retrieveClientFormType } from "../../schemas/RetrieveClientSchema";
import retrieveClientSchema from "../../schemas/RetrieveClientSchema";

type Props = {
  cedulaClientModal: {
    isOpen: boolean;
    onClose: () => void;
  };
  updateClientModal: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
};

function CedulaClientModal({ cedulaClientModal, updateClientModal }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<retrieveClientFormType>({
    resolver: zodResolver(retrieveClientSchema),
  });

  const [cedula, setCedula] = useState<number>(0);

  const {
    data: dataService,
    refetch,
    error,
    isLoading,
  } = UseClientSearch(cedula);

  const { setClient } = useClientStore();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (dataService) {
      setClient(dataService);
      updateClientModal.onOpen();
      cedulaClientModal.onClose();
      reset();
    }
  }, [dataService]);

  const onSubmit = () => {
    refetch();
  };

  const cancelar = () => {
    queryClient.removeQueries({ queryKey: ["client"] });
    cedulaClientModal.onClose();
    reset();
  };

  return (
    <>
      <Modal isOpen={cedulaClientModal.isOpen} onClose={cancelar}>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"}>
          <ModalHeader bg={"blue.600"} color="white" borderTopRadius={"20px"}>
            Cédula cliente
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl>
                <FormLabel>Cédula:</FormLabel>
                <Input
                  {...register("cedulaCliente")}
                  placeholder="Ingrese la cédula del cliente"
                />
                {isLoading && <Spinner />}

                {errors && (
                  <Text color={"red"}>{errors.cedulaCliente?.message}</Text>
                )}

                {error && <Text color={"red"}>Cliente no encontrado</Text>}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setCedula(getValues("cedulaCliente"))}
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

export default CedulaClientModal;

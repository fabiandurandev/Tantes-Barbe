import {
  Button,
  Divider,
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
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useClientStore } from "../../contexts/store";
import { UseUpdateClient } from "../../hooks/UseUpdateClient";
import {
  addClientSchema,
  type addClientFormType,
} from "../../schemas/AddClient";

type Props = {
  modalUpdateClient: {
    isOpen: boolean;
    onClose: () => void;
  };
};

function UpdateSupplier({ modalUpdateClient }: Props) {
  const {
    register,
    handleSubmit,
    reset: resetForm,
  } = useForm<addClientFormType>({
    resolver: zodResolver(addClientSchema),
  });
  const { mutate, reset } = UseUpdateClient();

  const queryClient = useQueryClient();

  const { client, resetClient } = useClientStore();

  const onSubmit = (dataForm: addClientFormType) => {
    const clientLoad = {
      cedulaCliente: dataForm.cedulaCliente,
      data: {
        nombreCliente: dataForm.nombreCliente,
        cedulaCliente: dataForm.cedulaCliente,
        direccionCliente: dataForm.direccionCliente,
        telefonoCliente: dataForm.telefonoCliente,
      },
    };
    mutate(clientLoad, {
      onSuccess: () => {
        reset();
        resetForm();
        queryClient.removeQueries({ queryKey: ["client"] });
        modalUpdateClient.onClose();
      },
    });
  };

  const onClose = () => {
    modalUpdateClient.onClose();
    resetClient();
    resetForm();
    queryClient.removeQueries({ queryKey: ["client"] });
    reset();
  };

  return (
    <>
      <Modal isOpen={modalUpdateClient.isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="20px">
          <ModalHeader
            borderTopRadius="20px"
            bg="blue.600"
            color="white"
            fontSize="lg"
            fontWeight="bold"
          >
            Modificar Proveedor
          </ModalHeader>
          <ModalCloseButton color="white" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody py={4}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel fontWeight="bold">RIF:</FormLabel>
                  <Input
                    {...register("cedulaCliente")}
                    readOnly
                    defaultValue={client?.cedulaCliente}
                    borderWidth={2}
                    borderRadius="md"
                  />

                  <FormLabel fontWeight="bold">Dirección:</FormLabel>
                  <Input
                    {...register("direccionCliente")}
                    defaultValue={client?.direccionCliente}
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormLabel fontWeight="bold">Nombre:</FormLabel>
                  <Input
                    {...register("nombreCliente")}
                    defaultValue={client?.nombreCliente}
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormLabel fontWeight="bold">Teléfono:</FormLabel>
                  <Input
                    {...register("telefonoCliente")}
                    defaultValue={client?.telefonoCliente}
                    borderWidth={2}
                    borderRadius="md"
                  />
                </FormControl>
              </Stack>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                borderRadius="md"
                fontWeight="bold"
              >
                CONFIRMAR CAMBIOS
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                borderRadius="md"
                fontWeight="bold"
              >
                CANCELAR
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateSupplier;

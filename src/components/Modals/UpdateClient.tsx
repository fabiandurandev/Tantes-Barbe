import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
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
  useToast,
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
    formState: { errors },
  } = useForm<addClientFormType>({
    resolver: zodResolver(addClientSchema),
  });
  const { mutate, reset } = UseUpdateClient();

  const queryClient = useQueryClient();

  const { client, resetClient } = useClientStore();

  const toast = useToast();

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
        resetClient();
        modalUpdateClient.onClose();
        toast({
          title: "Cliente actualizado.",
          description: "Se han actualizado los datos del cliente con éxtio!",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
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
                <FormLabel fontWeight="bold">Cédula:</FormLabel>
                <Input
                  {...register("cedulaCliente")}
                  readOnly
                  defaultValue={client?.cedulaCliente}
                  borderWidth={2}
                  borderRadius="md"
                />

                <FormControl isInvalid={!!errors.nombreCliente}>
                  <FormLabel fontWeight="bold">Nombre:</FormLabel>
                  <Input
                    {...register("nombreCliente")}
                    defaultValue={client?.nombreCliente}
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.nombreCliente && errors.nombreCliente.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.direccionCliente}>
                  <FormLabel fontWeight="bold">Dirección:</FormLabel>
                  <Input
                    {...register("direccionCliente")}
                    defaultValue={client?.direccionCliente}
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.direccionCliente && errors.direccionCliente.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.telefonoCliente}>
                  <FormLabel fontWeight="bold">Teléfono:</FormLabel>
                  <Input
                    {...register("telefonoCliente")}
                    defaultValue={client?.telefonoCliente}
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.telefonoCliente && errors.telefonoCliente.message}
                  </FormErrorMessage>
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
                Actualizar
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                borderRadius="md"
                fontWeight="bold"
              >
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateSupplier;

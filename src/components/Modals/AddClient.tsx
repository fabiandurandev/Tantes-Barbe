import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UseAddClient } from "../../hooks/UseAddClient";
import {
  addClientSchema,
  type addClientFormType,
} from "../../schemas/AddClient";

type Props = {
  addClientModal: {
    isOpen: boolean;
    onClose: () => void;
  };
};

function AddClient({ addClientModal }: Props) {
  // React Hook Form + Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addClientFormType>({
    resolver: zodResolver(addClientSchema),
  });

  // Custom hook para la mutación
  const { mutate } = UseAddClient();

  // Submit handler
  const onSubmit = async (data: addClientFormType) => {
    const clientLoad = {
      nombreCliente: data.nombreCliente,
      cedulaCliente: data.cedulaCliente,
      telefonoCliente: data.telefonoCliente,
      direccionCliente: data.direccionCliente,
    };
    mutate(clientLoad, {
      onSuccess: () => {
        reset();
        addClientModal.onClose();
      },
    });
  };

  const cancelar = () => {
    addClientModal.onClose();
    reset();
  };

  return (
    <Modal isOpen={addClientModal.isOpen} onClose={cancelar}>
      <ModalOverlay />
      <ModalContent borderRadius={"20px"}>
        <ModalHeader
          borderTopRadius={"20px"}
          bg={"blue.600"}
          color="white"
          fontSize="lg"
          fontWeight="bold"
        >
          Agregar nuevos clientes
        </ModalHeader>
        <ModalCloseButton color="white" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody py={4}>
            <Stack spacing={6}>
              <Heading as="h3" size="md" fontWeight="semibold">
                Datos del Cliente
              </Heading>
              <FormControl isInvalid={!!errors.cedulaCliente}>
                <FormLabel>Cédula:</FormLabel>
                <Input
                  type="number"
                  {...register("cedulaCliente")}
                  borderWidth={2}
                  borderRadius="md"
                />
                <FormErrorMessage>
                  {errors.cedulaCliente && errors.cedulaCliente.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.telefonoCliente}>
                <FormLabel>Teléfono:</FormLabel>
                <Input
                  type="number"
                  {...register("telefonoCliente")}
                  borderWidth={2}
                  borderRadius="md"
                />
                <FormErrorMessage>
                  {errors.telefonoCliente && errors.telefonoCliente.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.nombreCliente}>
                <FormLabel>Nombre:</FormLabel>
                <Input
                  type="text"
                  {...register("nombreCliente")}
                  borderWidth={2}
                  borderRadius="md"
                />
                <FormErrorMessage>
                  {errors.nombreCliente && errors.nombreCliente.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.direccionCliente}>
                <FormLabel>Dirección:</FormLabel>
                <Input
                  type="text"
                  {...register("direccionCliente")}
                  borderWidth={2}
                  borderRadius="md"
                />
                <FormErrorMessage>
                  {errors.direccionCliente && errors.direccionCliente.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              borderRadius="md"
              leftIcon={<span>+</span>}
              type="submit"
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
  );
}

export default AddClient;

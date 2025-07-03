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

interface AddClientProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddClient({ isOpen, onClose }: AddClientProps) {
  // React Hook Form + Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<addClientFormType>({
    resolver: zodResolver(addClientSchema),
  });

  // Custom hook para la mutación
  const mutation = UseAddClient();

  // Submit handler
  const onSubmit = async (data: addClientFormType) => {
    mutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
        <ModalBody py={4}>
          <form id="add-client-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              <Heading as="h3" size="md" fontWeight="semibold">
                Datos del Cliente
              </Heading>
              <FormControl isInvalid={!!errors.cedulaCliente}>
                <FormLabel>Cédula:</FormLabel>
                <Input
                  type="number"
                  {...register("cedulaCliente", { valueAsNumber: true })}
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
                  {...register("telefonoCliente", { valueAsNumber: true })}
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
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            borderRadius="md"
            leftIcon={<span>+</span>}
            type="submit"
            form="add-client-form"
            isLoading={isSubmitting || mutation.isPending}
          >
            Agregar
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              reset();
              onClose();
            }}
            borderRadius="md"
            isDisabled={isSubmitting || mutation.isPending}
          >
            CANCELAR
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddClient;
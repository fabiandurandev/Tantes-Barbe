import {
  Button,
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
  Divider,
  FormErrorMessage,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useClientStore } from "../../contexts/store";
import { addClientSchema, type addClientFormType } from "../../schemas/AddClient";
import { UseUpdateClient } from "../../pages/Clientes/UpdateClient";
import { useFetchClientByCedula } from "../../hooks/useFetchClientByCedula";
import type { ClientType } from "../../types";
import axios from "axios";
import React from "react";

interface UpdateClientProps {
  isOpen: boolean;
  onClose: () => void;
}

function UpdateClient({ isOpen, onClose }: UpdateClientProps) {
  const toast = useToast();
  const { client, setClient, resetClient } = useClientStore();
  const [cedulaInput, setCedulaInput] = useState<number | undefined>(undefined);

  // Buscar cliente al ingresar cédula
  const { data, isFetching, error } = useFetchClientByCedula(cedulaInput);

  // Actualizar store cuando se recibe el cliente
  React.useEffect(() => {
    if (data) setClient(data as ClientType);
    else resetClient();
  }, [data, setClient, resetClient]);

  // Formulario
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<addClientFormType>({
    resolver: zodResolver(addClientSchema),
    values: client
      ? {
          cedulaCliente: client.cedulaCliente,
          telefonoCliente: Number(client.telefonoCliente),
          nombreCliente: client.nombreCliente,
          direccionCliente: client.direccionCliente,
        }
      : undefined,
  });

  // Mutación para actualizar
  const mutation = UseUpdateClient();

  // Actualizar datos
  const onSubmit = async (values: addClientFormType) => {
    mutation.mutate(
      {
        cedulaCliente: values.cedulaCliente,
        data: {
          nombreCliente: values.nombreCliente,
          direccionCliente: values.direccionCliente,
          telefonoCliente: values.telefonoCliente,
        },
      },
      {
        onSuccess: () => {
          toast({ title: "Cliente actualizado", status: "success" });
          reset();
          resetClient();
          setCedulaInput(undefined);
          onClose();
        },
        onError: () => {
          toast({ title: "Error al actualizar", status: "error" });
        },
      }
    );
  };

  // Eliminar cliente
  const handleDelete = async () => {
  if (!client) return;
  try {
    await axios.patch(`http://localhost:8000/cliente/${client.cedulaCliente}`, {
      estado: "Desactivo",
    });
    toast({ title: "Cliente Eliminado", status: "info" });
    reset();
    resetClient();
    setCedulaInput(undefined);
    onClose();
  } catch (error) {
    toast({ title: "Error al Eliminar", status: "error" });
    console.error(error);
  }
};

  // Limpiar todo al cerrar
  const handleClose = () => {
    reset();
    resetClient();
    setCedulaInput(undefined);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent borderRadius={"20px"}>
        <ModalHeader
          borderTopRadius={"20px"}
          bg={"blue.600"}
          color="white"
          fontSize="lg"
          fontWeight="bold"
        >
          Modificar Cliente
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody py={4}>
          <Stack spacing={4}>
            <Heading as="h3" size="md" fontWeight="semibold">
              Datos del Cliente
            </Heading>
            {/* Input para buscar por cédula */}
            <FormControl isInvalid={!!errors.cedulaCliente}>
              <FormLabel>Cédula</FormLabel>
              <Input
                type="number"
                placeholder="V-########"
                borderWidth={2}
                fontWeight="bold"
                borderRadius="md"
                {...register("cedulaCliente", {
                  valueAsNumber: true,
                  onChange: (e) => {
                    const value = Number(e.target.value);
                    setCedulaInput(value > 0 ? value : undefined);
                  },
                })}
                onBlur={(e) => {
                  const value = Number(e.target.value);
                  setCedulaInput(value > 0 ? value : undefined);
                }}
              />
              <FormErrorMessage>
                {errors.cedulaCliente && errors.cedulaCliente.message}
              </FormErrorMessage>
            </FormControl>
            {/* Mostrar spinner mientras busca */}
            {isFetching && <Spinner size="sm" />}
            {/* Mostrar error si no existe */}
            {cedulaInput && error && (
              <span style={{ color: "red" }}>No se encontró el cliente.</span>
            )}
            {/* Mostrar el resto del formulario solo si hay cliente */}
            {client && (
              <>
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
                    {...register("direccionCliente")}
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.direccionCliente && errors.direccionCliente.message}
                  </FormErrorMessage>
                </FormControl>
              </>
            )}
          </Stack>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            borderRadius="md"
            fontWeight="bold"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting || mutation.isPending}
            isDisabled={!client}
          >
            CONFIRMAR CAMBIOS
          </Button>
          <Button
            colorScheme="red"
            variant="outline"
            mr={3}
            borderRadius="md"
            fontWeight="bold"
            onClick={handleDelete}
            isDisabled={!client}
          >
            ELIMINAR
          </Button>
          <Button
            variant="outline"
            onClick={handleClose}
            borderRadius="md"
            fontWeight="bold"
          >
            CANCELAR
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UpdateClient;
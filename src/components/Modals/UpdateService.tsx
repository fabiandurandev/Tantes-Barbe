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
import { UseServiceStoreUpdateDelete } from "../../contexts/store";
import {
  addServiceSchema,
  type addServiceFormType,
} from "../../schemas/AddService";
import type { ServiceType } from "../../types";
import { UseUpdateService } from "../../pages/Servicios/UpdateService";

type Props = {
  modal2: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
  };
  service: ServiceType;
};

function UpdateService({ modal2, service }: Props) {
  const { resetService } = UseServiceStoreUpdateDelete();

  const queryClient = useQueryClient();

  const cancelar = () => {
    modal2.onClose();
    resetService();
    queryClient.removeQueries({ queryKey: ["service"] });
  };

  const { register, handleSubmit, reset } = useForm<addServiceFormType>({
    resolver: zodResolver(addServiceSchema),
  });

  const { mutate } = UseUpdateService();

  const onSubmit = (data: addServiceFormType) => {
    mutate({
      codigoServicio: data.codigoServicio,
      data: {
        nombreServicio: data.nombreServicio,
        precioServicio: data.precioServicio,
      },
    });
    modal2.onClose();
    reset();
  };
  return (
    <>
      <Modal isOpen={modal2.isOpen} onClose={modal2.onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"}>
          <ModalHeader
            borderTopRadius={"20px"}
            bg={"blue.600"}
            color="white"
            fontSize="lg"
            fontWeight="bold"
          >
            Modificar Servicio
          </ModalHeader>
          <ModalCloseButton color="white" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody py={4}>
              <Stack spacing={6}>
                <Text fontSize="md" fontWeight="semibold">
                  Servicio
                </Text>

                <FormControl>
                  <FormLabel>Código:</FormLabel>
                  <Input
                    {...register("codigoServicio")}
                    readOnly
                    defaultValue={service.codigoServicio}
                    placeholder="#####"
                    borderWidth={2}
                    borderRadius="md"
                    fontSize="lg"
                    fontWeight="bold"
                  />
                  <FormLabel>Descripción:</FormLabel>
                  <Input
                    {...register("nombreServicio")}
                    defaultValue={service.nombreServicio}
                    placeholder=" "
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormLabel>Precio:</FormLabel>
                  <Input
                    {...register("precioServicio")}
                    defaultValue={service.precioServicio}
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
                CONFIRMAR CAMBIOS
              </Button>

              <Button variant="ghost" onClick={cancelar} borderRadius="md">
                CANCELAR
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateService;

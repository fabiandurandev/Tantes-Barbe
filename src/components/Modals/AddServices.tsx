import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  addServiceSchema,
  type addServiceFormType,
} from "../../schemas/AddService";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseAddService } from "../../hooks/UseAddService";
import AddServiceLoad from "../../pages/Servicios/AddServiceLoad";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

type Props = {
  modal1: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
  };
};

function Services({ modal1 }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<addServiceFormType>({
    resolver: zodResolver(addServiceSchema),
  });

  const {
    mutate: RegisterService,
    error,
    reset: resetAddService,
  } = UseAddService();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const onClick = (data: addServiceFormType) => {
    const serviceLoad = {
      nombreServicio: data.nombreServicio,
      codigoServicio: data.codigoServicio,
      precioServicio: data.precioServicio,
    };
    RegisterService(serviceLoad, {
      onSuccess: (data) => {
        reset();
        modal1.onClose();
        navigate("/");
      },
    });
  };

  const onClose = () => {
    reset();
    resetAddService();
    modal1.onClose();
  };

  return (
    <>
      <Modal isOpen={modal1.isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"20"}>
          <ModalHeader borderTopRadius={"10"} bg={"blue.600"}>
            Agregar nuevos servicios
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onClick)}>
            <ModalBody>
              <Stack spacing={4}>
                //Codigo
                <FormControl>
                  <FormLabel>Código:</FormLabel>
                  <Input
                    {...register("codigoServicio")}
                    placeholder="Ingrese el codigo"
                    borderWidth={2}
                  />
                  {error && <Text color={"red"}>Codigo ya existe!</Text>}
                  {errors.codigoServicio && (
                    <Text color={"red"}>{errors.codigoServicio.message}</Text>
                  )}
                  {/*descripcion*/}
                  <FormLabel>Descripción:</FormLabel>
                  <Input
                    {...register("nombreServicio")}
                    placeholder="Ingrese la descripcion"
                    borderWidth={2}
                  />
                  {errors.nombreServicio && (
                    <Text color={"red"}>{errors.nombreServicio.message}</Text>
                  )}
                  {/* Precio */}
                  <FormLabel>Precio:</FormLabel>
                  <Input
                    {...register("precioServicio")}
                    type="number"
                    placeholder="Ingrese el precio"
                    borderWidth={2}
                  />
                  {errors.precioServicio && (
                    <Text color={"red"}>{errors.precioServicio.message}</Text>
                  )}
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                CANCELAR
              </Button>
              <Button type="submit" colorScheme="blue">
                + Agregar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Services;

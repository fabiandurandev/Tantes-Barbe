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
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { UseAddService } from "../../hooks/UseAddService";
import {
  addServiceSchema,
  type addServiceFormType,
} from "../../schemas/AddService";

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
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addServiceFormType>({
    resolver: zodResolver(addServiceSchema),
  });

  const {
    mutate: RegisterService,
    error,
    reset: resetAddService,
  } = UseAddService();

  const navigate = useNavigate();

  const onClick = (data: addServiceFormType) => {
    const serviceLoad = {
      nombreServicio: data.nombreServicio,
      codigoServicio: data.codigoServicio,
      precioServicio: data.precioServicio,
    };
    RegisterService(serviceLoad, {
      onSuccess: () => {
        reset();
        modal1.onClose();
        navigate("/servicios");
        toast({
          title: "Servicio agregado",
          description: "El servicio ha sido agregado correctamente.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
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
          <ModalHeader color={"white"} borderTopRadius={"10"} bg={"blue.600"}>
            Agregar nuevo servicio
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
              <Button type="submit" colorScheme="blue">
                Agregar
              </Button>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Services;

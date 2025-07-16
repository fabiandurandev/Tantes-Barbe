import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
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
import { useForm } from "react-hook-form";
import { UseAddSupplier } from "../../hooks/UseAddSupplier";
import {
  addSupplierSchema,
  type AddSupplierFormType,
} from "../../schemas/AddSupplier";

type Props = {
  modalAddSupplier: {
    isOpen: boolean;
    onClose: () => void;
  };
};

function AddSupplier({ modalAddSupplier }: Props) {
  const {
    register,
    reset: resetForm,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSupplierFormType>({
    resolver: zodResolver(addSupplierSchema),
  });

  const { mutate: RegisterSupplier, reset } = UseAddSupplier();

  const toast = useToast();

  const onSubmit = (supplier: AddSupplierFormType) => {
    const supplierLoad = {
      rifProveedor: supplier.rifProveedor,
      nombreProveedor: supplier.nombreProveedor,
      emailProveedor: supplier.emailProveedor,
      telefonoProveedor: supplier.telefonoProveedor,
      direccionProveedor: supplier.direccionProveedor,
    };

    RegisterSupplier(supplierLoad, {
      onSuccess: () => {
        resetForm();
        reset();
        modalAddSupplier.onClose();
        toast({
          title: "Registro de proveedor exitoso!",
          description: "Se ha registrado el proveedor con éxito!",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      },
    });
  };

  const onClose = () => {
    resetForm();
    modalAddSupplier.onClose();
  };

  return (
    <>
      <Modal
        isOpen={modalAddSupplier.isOpen}
        onClose={modalAddSupplier.onClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius="20px">
          <ModalHeader
            borderTopRadius="20px"
            bg="blue.600"
            color="white"
            fontSize="lg"
            fontWeight="bold"
          >
            Agregar nuevos proveedores
          </ModalHeader>
          <ModalCloseButton color="white" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody py={4}>
              <Stack spacing={4}>
                <Heading as="h3" size="md" fontWeight="semibold">
                  Datos del Proveedor
                </Heading>
                {/* RIF de la empresa */}

                <FormControl isInvalid={!!errors.rifProveedor}>
                  <FormLabel fontWeight="bold">RIF:</FormLabel>
                  <Input
                    {...register("rifProveedor")}
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.rifProveedor && errors.rifProveedor.message}
                  </FormErrorMessage>
                </FormControl>

                {/* parte para el nombre */}
                <FormControl isInvalid={!!errors.nombreProveedor}>
                  <FormLabel fontWeight="bold">Nombre:</FormLabel>
                  <Input
                    {...register("nombreProveedor")}
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.nombreProveedor && errors.nombreProveedor.message}
                  </FormErrorMessage>
                </FormControl>

                {/* Correo electronico */}
                <FormControl isInvalid={!!errors.emailProveedor}>
                  <FormLabel fontWeight="bold">Email:</FormLabel>
                  <Input
                    {...register("emailProveedor")}
                    type="email"
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.emailProveedor && errors.emailProveedor.message}
                  </FormErrorMessage>
                </FormControl>

                {/* Seccion del numero del telefono */}
                <FormControl isInvalid={!!errors.telefonoProveedor}>
                  <FormLabel fontWeight="bold">Teléfono:</FormLabel>
                  <Input
                    {...register("telefonoProveedor")}
                    type="tel"
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.telefonoProveedor &&
                      errors.telefonoProveedor.message}
                  </FormErrorMessage>
                </FormControl>

                {/* Seccion de la direccion */}
                <FormControl isInvalid={!!errors.direccionProveedor}>
                  <FormLabel fontWeight="bold">Dirección:</FormLabel>
                  <Input
                    {...register("direccionProveedor")}
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.direccionProveedor &&
                      errors.direccionProveedor.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </ModalBody>
            <Divider />
            {/* Seccion de botones */}
            <ModalFooter>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                borderRadius="md"
                leftIcon={<span>+</span>}
              >
                Agregar
              </Button>
              <Button variant="outline" onClick={onClose} borderRadius="md">
                CANCELAR
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddSupplier;

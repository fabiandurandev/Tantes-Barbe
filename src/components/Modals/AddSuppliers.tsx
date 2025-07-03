import {
  Button,
  Divider,
  FormControl,
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
  Text,
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

  const { mutate: RegisterSupplier, error, reset } = UseAddSupplier();

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
                <FormControl>
                  <FormLabel fontWeight="bold">RIF:</FormLabel>
                  <Input
                    {...register("rifProveedor")}
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  {error && <Text color={"red"}>El rif ya existe</Text>}
                  {errors && (
                    <Text color={"red"}>{errors.rifProveedor?.message}</Text>
                  )}

                  {/* parte para el nombre */}
                  <FormLabel fontWeight="bold">Nombre:</FormLabel>
                  <Input
                    {...register("nombreProveedor")}
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  {errors && (
                    <Text color={"red"}>{errors.nombreProveedor?.message}</Text>
                  )}

                  {/* Correo electronico */}
                  <FormLabel fontWeight="bold">Email:</FormLabel>
                  <Input
                    {...register("emailProveedor")}
                    type="email"
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  {errors && (
                    <Text color={"red"}>{errors.emailProveedor?.message}</Text>
                  )}

                  {/* Seccion del numero del telefono */}
                  <FormLabel fontWeight="bold">Teléfono:</FormLabel>
                  <Input
                    {...register("telefonoProveedor")}
                    type="tel"
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  {errors && (
                    <Text color={"red"}>
                      {errors.telefonoProveedor?.message}
                    </Text>
                  )}

                  {/* Seccion de la direccion */}
                  <FormLabel fontWeight="bold">Dirección:</FormLabel>
                  <Input
                    {...register("direccionProveedor")}
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  {errors && (
                    <Text color={"red"}>
                      {errors.direccionProveedor?.message}
                    </Text>
                  )}
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

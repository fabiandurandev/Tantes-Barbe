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
import { UseSupplierStoreUpdateDelete } from "../../contexts/store";
import { UseUpdateSupplier } from "../../hooks/UseUpdateSupplier";
import {
  addSupplierSchema,
  type AddSupplierFormType,
} from "../../schemas/AddSupplier";
import type { SupplierType } from "../../types";

type Props = {
  modalUpdateSupplier: {
    isOpen: boolean;
    onClose: () => void;
  };
  supplier: SupplierType;
};

function UpdateSupplier({ modalUpdateSupplier, supplier }: Props) {
  const {
    register,
    handleSubmit,
    reset: resetForm,
  } = useForm<AddSupplierFormType>({
    resolver: zodResolver(addSupplierSchema),
  });
  const { mutate, reset } = UseUpdateSupplier();

  const queryClient = useQueryClient();

  const { resetSupplier } = UseSupplierStoreUpdateDelete();

  const onSubmit = (supplier: AddSupplierFormType) => {
    const supplierUpdated = {
      rifProveedor: supplier.rifProveedor,
      data: {
        emailProveedor: supplier.emailProveedor,
        direccionProveedor: supplier.direccionProveedor,
        nombreProveedor: supplier.nombreProveedor,
        telefonoProveedor: supplier.telefonoProveedor,
      },
    };
    mutate(
      {
        rifProveedor: supplierUpdated.rifProveedor,
        data: supplierUpdated.data,
      },
      {
        onSuccess: () => {
          reset();
          resetForm();
          queryClient.removeQueries({ queryKey: ["supplier"] });
          modalUpdateSupplier.onClose();
        },
      }
    );
  };

  const onClose = () => {
    modalUpdateSupplier.onClose();
    resetSupplier();
    resetForm();
    queryClient.removeQueries({ queryKey: ["supplier"] });
    reset();
  };

  return (
    <>
      <Modal isOpen={modalUpdateSupplier.isOpen} onClose={onClose}>
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
                    {...register("rifProveedor")}
                    readOnly
                    defaultValue={supplier.rifProveedor}
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormLabel fontWeight="bold">Email:</FormLabel>
                  <Input
                    {...register("emailProveedor")}
                    defaultValue={supplier.emailProveedor}
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormLabel fontWeight="bold">Dirección:</FormLabel>
                  <Input
                    {...register("direccionProveedor")}
                    defaultValue={supplier.direccionProveedor}
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormLabel fontWeight="bold">Nombre:</FormLabel>
                  <Input
                    {...register("nombreProveedor")}
                    defaultValue={supplier.nombreProveedor}
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormLabel fontWeight="bold">Teléfono:</FormLabel>
                  <Input
                    {...register("telefonoProveedor")}
                    defaultValue={supplier.telefonoProveedor}
                    placeholder="##########"
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

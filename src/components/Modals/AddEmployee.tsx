import {
  Button,
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
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UseAddEmployee } from "../../hooks/UseAddEmployee";
import {
  addEmployeeSchema,
  type addEmployeeFormType,
} from "../../schemas/AddEmployee";

type Props = {
  modalAddEmployee: {
    isOpen: boolean;
    onClose: () => void;
  };
};

function AddEmployee({ modalAddEmployee }: Props) {
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<addEmployeeFormType>({
    resolver: zodResolver(addEmployeeSchema),
  });

  const { mutate, reset } = UseAddEmployee();

  const toast = useToast();

  const onSubmit = (dataEmployee: addEmployeeFormType) => {
    const employeeLoad = {
      nombreEmpleado: dataEmployee.nombreEmpleado,
      cedulaEmpleado: dataEmployee.cedulaEmpleado,
      direccionEmpleado: dataEmployee.direccionEmpleado,
      telefonoEmpleado: dataEmployee.telefonoEmpleado,
      emailEmpleado: dataEmployee.emailEmpleado,
      nivelAutorizacion: dataEmployee.nivelAutorizacion,
    };

    mutate(employeeLoad, {
      onSuccess: () => {
        resetForm();
        reset();
        modalAddEmployee.onClose();
        toast({
          title: "Empleado registrado!",
          description: "El empleado se ha registrado de forma exitosa.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      },
    });
  };

  const cancelar = () => {
    modalAddEmployee.onClose();
    resetForm();
  };

  return (
    <>
      <Modal isOpen={modalAddEmployee.isOpen} onClose={cancelar}>
        <ModalOverlay />
        <ModalContent borderRadius="20px">
          <ModalHeader
            borderTopRadius="20px"
            bg="blue.600"
            color="white"
            fontSize="lg"
            fontWeight="bold"
          >
            Agregar empleado
          </ModalHeader>
          <ModalCloseButton color="white" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody py={4}>
              <Stack spacing={4}>
                <Heading as="h3" size="md" fontWeight="semibold">
                  Datos del Empleado
                </Heading>

                <FormControl isInvalid={!!errors.cedulaEmpleado}>
                  <FormLabel>Cédula:</FormLabel>
                  <Input
                    {...register("cedulaEmpleado")}
                    type="number"
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.cedulaEmpleado && errors.cedulaEmpleado.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.nombreEmpleado}>
                  <FormLabel>Nombre:</FormLabel>
                  <Input
                    {...register("nombreEmpleado")}
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.nombreEmpleado && errors.nombreEmpleado.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.telefonoEmpleado}>
                  <FormLabel>Teléfono:</FormLabel>
                  <Input
                    {...register("telefonoEmpleado")}
                    type="number"
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.telefonoEmpleado && errors.telefonoEmpleado.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.emailEmpleado}>
                  <FormLabel>Email:</FormLabel>
                  <Input
                    {...register("emailEmpleado")}
                    type="email"
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.emailEmpleado && errors.emailEmpleado.message}
                  </FormErrorMessage>
                </FormControl>

                {/* Nivel de autorizacion */}
                <FormControl isInvalid={!!errors.nivelAutorizacion}>
                  <FormLabel>Nivel de Autorización:</FormLabel>
                  <Select
                    {...register("nivelAutorizacion")}
                    placeholder="Seleccione una opción."
                  >
                    <option value="ADMIN">Administrador</option>
                    <option value="EMP">Empleado</option>
                  </Select>
                  <FormErrorMessage>
                    {errors.nivelAutorizacion &&
                      errors.nivelAutorizacion.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.direccionEmpleado}>
                  <FormLabel>Dirección:</FormLabel>
                  <Input
                    {...register("direccionEmpleado")}
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.direccionEmpleado &&
                      errors.direccionEmpleado.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </ModalBody>
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
              <Button variant="outline" onClick={cancelar} borderRadius="md">
                CANCELAR
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddEmployee;

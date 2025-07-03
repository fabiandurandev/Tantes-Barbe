import {
  Button,
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
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  addEmployeeSchema,
  type addEmployeeFormType,
} from "../../schemas/AddEmployee";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseAddEmployee } from "../../hooks/UseAddEmployee";

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

  const { mutate, reset, error } = UseAddEmployee();

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
            Agregar empleados
          </ModalHeader>
          <ModalCloseButton color="white" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody py={4}>
              <Stack spacing={4}>
                <Heading as="h3" size="md" fontWeight="semibold">
                  Datos del Empleado
                </Heading>
                <FormControl>
                  <FormLabel>Cédula:</FormLabel>
                  <Input
                    {...register("cedulaEmpleado")}
                    type="number"
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  {error && <Text color={"red"}>{error.message}</Text>}
                  {errors && (
                    <Text color={"red"}>{errors.cedulaEmpleado?.message}</Text>
                  )}
                  <FormLabel>Teléfono:</FormLabel>
                  <Input
                    {...register("telefonoEmpleado")}
                    type="number"
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  {errors && (
                    <Text color={"red"}>
                      {errors.telefonoEmpleado?.message}
                    </Text>
                  )}
                  <FormLabel>Nombre:</FormLabel>
                  <Input
                    {...register("nombreEmpleado")}
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  {errors && (
                    <Text color={"red"}>{errors.nombreEmpleado?.message}</Text>
                  )}
                  <FormLabel>Email:</FormLabel>
                  <Input
                    {...register("emailEmpleado")}
                    type="email"
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  {errors && (
                    <Text color={"red"}>{errors.emailEmpleado?.message}</Text>
                  )}
                  {/* Nivel de autorizacion */}
                  <FormLabel>Nivel de Autorización:</FormLabel>
                  <Select
                    {...register("nivelAutorizacion")}
                    placeholder="Seleccione una opción."
                  >
                    <option value="ADM">Administrador</option>
                    <option value="EMP">Empleado</option>
                  </Select>
                  {errors && (
                    <Text color={"red"}>
                      {errors.nivelAutorizacion?.message}
                    </Text>
                  )}
                  <FormLabel>Dirección:</FormLabel>
                  <Input
                    {...register("direccionEmpleado")}
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  {errors && (
                    <Text color={"red"}>
                      {errors.direccionEmpleado?.message}
                    </Text>
                  )}
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

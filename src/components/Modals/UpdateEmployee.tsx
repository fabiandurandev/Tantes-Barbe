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
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEmployeeStore } from "../../contexts/store";
import { UseUpdateEmployee } from "../../hooks/UseUpdateEmployee";
import {
  addEmployeeSchema,
  type addEmployeeFormType,
} from "../../schemas/AddEmployee";

type Props = {
  updateEmployeeModal: {
    isOpen: boolean;
    onClose: () => void;
  };
};

function UpdateEmployee({ updateEmployeeModal }: Props) {
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<addEmployeeFormType>({
    resolver: zodResolver(addEmployeeSchema),
  });

  const cancelar = () => {
    queryClient.removeQueries({ queryKey: ["employee"] });
    updateEmployeeModal.onClose();
    resetForm();
  };

  const { mutate, reset } = UseUpdateEmployee();

  const queryClient = useQueryClient();

  const { resetEmployee, employee } = useEmployeeStore();

  const onSubmit = (employee: addEmployeeFormType) => {
    const employeeUpdate = {
      cedulaEmpleado: employee.cedulaEmpleado,
      data: {
        nombreEmpleado: employee.nombreEmpleado,
        direccionEmpleado: employee.direccionEmpleado,
        telefonoEmpleado: employee.telefonoEmpleado,
        emailEmpleado: employee.emailEmpleado,
        nivelAutorizacion: employee.nivelAutorizacion,
      },
    };
    mutate(employeeUpdate, {
      onSuccess: () => {
        reset();
        resetForm();
        resetEmployee();
        queryClient.removeQueries({ queryKey: ["employee"] });
        updateEmployeeModal.onClose();
      },
    });
  };
  return (
    <>
      <Modal isOpen={updateEmployeeModal.isOpen} onClose={cancelar}>
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
                    defaultValue={employee?.cedulaEmpleado}
                    readOnly
                    {...register("cedulaEmpleado")}
                    type="number"
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />

                  {errors && (
                    <Text color={"red"}>{errors.cedulaEmpleado?.message}</Text>
                  )}
                  <FormLabel>Teléfono:</FormLabel>
                  <Input
                    defaultValue={employee?.telefonoEmpleado}
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
                    defaultValue={employee?.nombreEmpleado}
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
                    defaultValue={employee?.emailEmpleado}
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
                    defaultValue={employee?.nivelAutorizacion}
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
                    defaultValue={employee?.direccionEmpleado}
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

export default UpdateEmployee;

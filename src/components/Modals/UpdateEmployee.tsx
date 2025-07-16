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

  const toast = useToast();

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
        toast({
          title: "Empleado actualizado.",
          description: "Se ha actualizado el empleado de manera existosa!",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
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
            Actualizar empleado
          </ModalHeader>
          <ModalCloseButton color="white" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody py={4}>
              <Stack spacing={4}>
                <Heading as="h3" size="md" fontWeight="semibold">
                  Datos del Empleado
                </Heading>

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

                <FormControl>
                  <FormLabel>Nombre:</FormLabel>
                  <Input
                    defaultValue={employee?.nombreEmpleado}
                    {...register("nombreEmpleado")}
                    placeholder=""
                    borderWidth={2}
                    borderRadius="md"
                  />
                  <FormErrorMessage>
                    {errors.nombreEmpleado && errors.nombreEmpleado.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>Teléfono:</FormLabel>
                  <Input
                    defaultValue={employee?.telefonoEmpleado}
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

                <FormControl>
                  <FormLabel>Email:</FormLabel>
                  <Input
                    defaultValue={employee?.emailEmpleado}
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

                <FormControl>
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
                  <FormErrorMessage>
                    {errors.nivelAutorizacion &&
                      errors.nivelAutorizacion.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>Dirección:</FormLabel>
                  <Input
                    defaultValue={employee?.direccionEmpleado}
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
              <Button type="submit" colorScheme="blue" mr={3} borderRadius="md">
                Actualizar
              </Button>
              <Button variant="outline" onClick={cancelar} borderRadius="md">
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateEmployee;

import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type addEmployeeType = {
  nombreEmpleado: string;
  cedulaEmpleado: number;
  direccionEmpleado: string;
  telefonoEmpleado: string;
  emailEmpleado: string;
  nivelAutorizacion: string;
};

async function AddEmployeeFn(employee: addEmployeeType) {
  const response = await axios.post(
    "http://127.0.0.1:8000/empleados/",
    employee
  );

  return response.data;
}

export const UseAddEmployee = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: AddEmployeeFn,
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errors = error.response.data;

        if (errors.cedulaEmpleado) {
          toast({
            title: "Error con la cédula",
            description: "La cédula ya existe.",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        }

        if (errors.emailEmpleado) {
          toast({
            title: "Error con el correo",
            description: "El correo ya existe.",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        }

        // Puedes agregar más campos si deseas
      }
    },
  });
};

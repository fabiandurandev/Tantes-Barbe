import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type dataEmployeeType = {
  nombreEmpleado: string;
  direccionEmpleado: string;
  telefonoEmpleado: string;
  emailEmpleado: string;
  nivelAutorizacion: string;
};

async function UpdateEmployee({
  cedulaEmpleado,
  data,
}: {
  cedulaEmpleado: number;
  data: dataEmployeeType;
}) {
  const response = await axios.patch(
    `http://127.0.0.1:8000/empleado/${cedulaEmpleado}`,
    data
  );
  return response.data;
}

export function UseUpdateEmployee() {
  const toast = useToast();
  return useMutation({
    mutationFn: UpdateEmployee,
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errors = error.response.data;

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
}

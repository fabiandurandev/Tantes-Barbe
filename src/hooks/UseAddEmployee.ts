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

export const UseAddEmployee = () => useMutation({ mutationFn: AddEmployeeFn });

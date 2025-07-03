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
  return useMutation({ mutationFn: UpdateEmployee });
}
